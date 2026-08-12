const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

exports.handler = async (event) => {
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
    const { token, class_id, next_question_id, section } = JSON.parse(event.body);

    // Validate required fields
    if (!token || !class_id || !next_question_id) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields: token, class_id, next_question_id' })
      };
    }

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Fetch the session and verify instructor owns it
    const { data: session, error: sessionError } = await supabase
      .from('class_sessions')
      .select('id, quiz_type, current_question_id, is_active')
      .eq('class_id', class_id)
      .eq('instructor_id', decoded.userId)
      .eq('is_active', true)
      .single();

    if (sessionError || !session) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Session not found or not authorized' })
      };
    }

    // 2. Get stats for the previous question (if there was one)
    let previousQuestionStats = null;
    if (session.current_question_id) {
      const { data: responses, error: statsError } = await supabase
        .from('question_responses')
        .select('is_correct, attempt_number')
        .eq('session_id', session.id)
        .eq('question_id', session.current_question_id);

      if (responses && responses.length > 0) {
        const correctFirstAttempt = responses.filter(r => r.attempt_number === 1 && r.is_correct).length;
        const needsRetry = responses.filter(r => r.attempt_number > 1).length;
        const totalFinal = responses.filter(r => r.final_answer === true).length || responses.length;
        const accuracy = Math.round((totalFinal / responses.length) * 100);

        previousQuestionStats = {
          question_id: session.current_question_id,
          total_responses: responses.length,
          correct_first_attempt: correctFirstAttempt,
          needed_retry: needsRetry,
          accuracy_rate: accuracy
        };
      }
    }

    // 3. Update session with new current question
    const { data: updatedSession, error: updateError } = await supabase
      .from('class_sessions')
      .update({
        current_question_id: next_question_id,
        current_section: section || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating session:', updateError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to advance question' })
      };
    }

    // 4. Return response
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        current_question_id: updatedSession.current_question_id,
        current_section: updatedSession.current_section,
        previous_question_stats: previousQuestionStats
      })
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
