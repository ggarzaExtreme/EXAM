const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

// Static requires so Netlify's bundler packages the quiz data files with the function.
const QUIZ_DATA = {
  'pretraining': require('../../quiz-data/quiz_data_pre_class.js'),
  'post_class': require('../../quiz-data/quiz_data_post_class.js'),
  'fabric': require('../../quiz-data/quiz_data_fabric_engine.js'),
  'switch': require('../../quiz-data/quiz_data_switch_engine.js')
};

const ALLOWED_QUIZ_TYPES = ['pretraining', 'post_class', 'fabric', 'switch'];
const DEFAULT_LIMIT = 50;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { token, quiz_type, mode, limit, offset, section, class_id } = JSON.parse(event.body);

    // inclass_live mode needs class_id instead of quiz_type
    if (!token || (mode === 'inclass_live' ? !class_id : !quiz_type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: mode === 'inclass_live' ? 'Token and class_id required' : 'Token and quiz_type required' })
      };
    }

    // Validate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Missing JWT_SECRET environment variable');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
    } catch (err) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    // Validate quiz_type to prevent injection (skipped in inclass_live mode,
    // where quiz_type comes from the session record instead)
    if (mode !== 'inclass_live' && !ALLOWED_QUIZ_TYPES.includes(quiz_type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid quiz type' })
      };
    }

    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ===== IN-CLASS LIVE MODE =====
    // Returns aggregated live stats for the instructor dashboard
    if (mode === 'inclass_live') {
      // 1. Fetch the session (must belong to this instructor)
      const { data: session, error: sessionError } = await supabase
        .from('class_sessions')
        .select('id, quiz_type, current_question_id, current_section, is_active')
        .eq('class_id', class_id)
        .eq('instructor_id', decoded.userId)
        .eq('is_active', true)
        .single();

      if (sessionError || !session) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Session not found or not active' })
        };
      }

      // 2. Session roster: everyone who has answered ANY question in this
      // session. Students stay listed for the rest of the session so the
      // instructor can see who hasn't answered the current question yet.
      // (Two narrow columns; a class-sized session is a few hundred rows.)
      const { data: rosterRows, error: rosterError } = await supabase
        .from('question_responses')
        .select('email, name, created_at')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      if (rosterError) {
        console.error('Fetch roster error:', rosterError);
        return {
          statusCode: 500,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Failed to fetch session roster' })
        };
      }

      // email is the per-student key (anonymous students get a generated
      // anon-<uuid>); the most recent name they used is the display name
      const roster = new Map();
      (rosterRows || []).forEach(r => {
        const key = r.email || r.name;
        if (key) roster.set(key, r.name || 'Anonymous');
      });

      const sortStudents = (a, b) =>
        (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }) ||
        (a.email || '').localeCompare(b.email || '');

      // 3. No question active yet — still report the roster
      if (!session.current_question_id) {
        const waiting = [...roster.entries()]
          .map(([email, name]) => ({ name, email, status: 'pending', selected_option: null, attempts: 0 }))
          .sort(sortStudents);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            success: true,
            current_question_id: null,
            current_section: session.current_section,
            answer_distribution: null,
            initial_distribution: null,
            retry_stats: { got_correct_first_attempt: 0, needed_one_retry: 0, needed_multiple_retries: 0 },
            participation: { total_responses: 0, students_pending: waiting.length, roster_size: waiting.length },
            students: waiting
          })
        };
      }

      // 4. Fetch all responses for the current question
      const { data: responses, error: respError } = await supabase
        .from('question_responses')
        .select('email, name, selected_option, is_correct, attempt_number')
        .eq('session_id', session.id)
        .eq('question_id', session.current_question_id)
        .order('attempt_number', { ascending: true });

      if (respError) {
        console.error('Fetch responses error:', respError);
        return {
          statusCode: 500,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Failed to fetch responses' })
        };
      }

      // 4. Determine the correct option letter from quiz data
      const quizData = QUIZ_DATA[session.quiz_type];
      const question = quizData ? quizData.find(q => q.id === parseInt(session.current_question_id)) : null;
      let correctLetter = null;
      if (question) {
        question.options.forEach((opt, idx) => {
          if (opt && opt.isCorrect === true) correctLetter = String.fromCharCode(65 + idx);
        });
      }

      // 5. Build answer distribution (counts latest attempt per student per option)
      const optionCount = question ? question.options.length : 4;
      const distribution = {};
      for (let i = 0; i < optionCount; i++) {
        const letter = String.fromCharCode(65 + i);
        distribution[letter] = { count: 0, percentage: 0, correct: letter === correctLetter };
      }
      (responses || []).forEach(r => {
        if (distribution[r.selected_option]) distribution[r.selected_option].count++;
      });
      const totalAnswers = (responses || []).length;
      Object.values(distribution).forEach(d => {
        d.percentage = totalAnswers > 0 ? (d.count / totalAnswers) * 100 : 0;
      });

      // 6. Per-student state for the current question
      const byStudent = new Map();
      (responses || []).forEach(r => {
        const key = r.email || r.name;
        if (!byStudent.has(key)) {
          byStudent.set(key, {
            correctAttempt: null, maxAttempt: 0, minAttempt: 0,
            attempts: 0, latestOption: null, firstOption: null, firstCorrect: false
          });
        }
        const s = byStudent.get(key);
        s.attempts++;
        if (r.attempt_number >= s.maxAttempt) {
          s.maxAttempt = r.attempt_number;
          s.latestOption = r.selected_option;
        }
        // Their opening answer, before any retries
        if (s.minAttempt === 0 || r.attempt_number < s.minAttempt) {
          s.minAttempt = r.attempt_number;
          s.firstOption = r.selected_option;
          s.firstCorrect = r.is_correct === true;
        }
        if (r.is_correct && (s.correctAttempt === null || r.attempt_number < s.correctAttempt)) {
          s.correctAttempt = r.attempt_number;
        }
        // A student's first appearance may be on this question
        roster.set(key, r.name || roster.get(key) || 'Anonymous');
      });

      // 6b. Initial-answer distribution: exactly one vote per student, their
      // first attempt. This is the diagnostic signal — where the class landed
      // before any retries — as opposed to the cumulative counts above.
      const initialDistribution = {};
      for (let i = 0; i < optionCount; i++) {
        const letter = String.fromCharCode(65 + i);
        initialDistribution[letter] = { count: 0, percentage: 0, correct: letter === correctLetter };
      }
      byStudent.forEach(s => {
        if (s.firstOption && initialDistribution[s.firstOption]) {
          initialDistribution[s.firstOption].count++;
        }
      });
      const initialTotal = byStudent.size;
      Object.values(initialDistribution).forEach(d => {
        d.percentage = initialTotal > 0 ? (d.count / initialTotal) * 100 : 0;
      });

      // 7. Roster-wide list: anyone who has participated in the session, marked
      // 'pending' until they answer the current question
      const students = [...roster.entries()].map(([email, name]) => {
        const s = byStudent.get(email);
        if (!s) {
          return { name, email, status: 'pending', selected_option: null, attempts: 0 };
        }
        return {
          name,
          email,
          status: s.correctAttempt !== null ? 'correct' : 'wrong',
          selected_option: s.latestOption,
          first_option: s.firstOption,
          first_correct: s.firstCorrect,
          attempts: s.attempts,
          correct_attempt: s.correctAttempt
        };
      }).sort(sortStudents);

      const answered = [...byStudent.values()];
      const retryStats = {
        got_correct_first_attempt: answered.filter(s => s.correctAttempt === 1).length,
        needed_one_retry: answered.filter(s => s.correctAttempt === 2).length,
        needed_multiple_retries: answered.filter(s => s.correctAttempt !== null && s.correctAttempt > 2).length
      };
      const participation = {
        total_responses: answered.length,
        // everyone on the roster who has not yet answered this question correctly
        students_pending: students.filter(s => s.status !== 'correct').length,
        roster_size: students.length
      };

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          current_question_id: session.current_question_id,
          current_section: session.current_section,
          answer_distribution: distribution,        // every submission, incl. retries
          initial_distribution: initialDistribution, // first attempt only, one per student
          retry_stats: retryStats,
          participation: participation,
          students: students
        })
      };
    }

    // ===== HISTORICAL / REALTIME MODES (full-quiz submissions) =====
    // Build query
    let query = supabase
      .from('submissions')
      .select('*', { count: 'exact' })
      .eq('quiz_type', quiz_type)
      .order('created_at', { ascending: false });

    // Apply mode-specific filters
    const queryMode = mode || 'historical';
    if (queryMode === 'realtime') {
      // Past 5 minutes for real-time in-class monitoring
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      query = query.gte('created_at', fiveMinutesAgo);

      // If section provided, filter by section
      if (section) {
        query = query.eq('section', section);
      }
    } else {
      // Past 7 days for historical analysis
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', sevenDaysAgo);
    }

    // Apply pagination
    const pageLimit = Math.min(limit || DEFAULT_LIMIT, 500); // Cap at 500
    const pageOffset = offset || 0;
    query = query.range(pageOffset, pageOffset + pageLimit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Fetch error:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to fetch submissions' })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        submissions: data || [],
        count: data?.length || 0,
        total: count || 0,
        offset: pageOffset,
        limit: pageLimit,
        mode: queryMode
      })
    };

  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
