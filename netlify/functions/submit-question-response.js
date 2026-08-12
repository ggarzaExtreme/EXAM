const { createClient } = require('@supabase/supabase-js');

// Static requires so Netlify's bundler packages the quiz data files with the function.
// (Dynamic require() paths are not traced at build time and fail in production.)
const QUIZ_DATA = {
  'pretraining': require('../../quiz_data_pre_class.js'),
  'post_class': require('../../quiz_data_post_class.js'),
  'fabric': require('../../quiz_data_fabric_engine.js'),
  'switch': require('../../quiz_data_switch_engine.js')
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
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
    const { class_id, question_id, selected_option, time_spent_seconds, name, email } = JSON.parse(event.body);

    // Validate required fields (email is optional)
    if (!class_id || !question_id || !selected_option || !name) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields: class_id, question_id, selected_option, name' })
      };
    }

    // Use empty string for email if not provided
    const emailValue = email || '';

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

    // 1. Fetch the active class session
    const { data: session, error: sessionError } = await supabase
      .from('class_sessions')
      .select('id, quiz_type, current_question_id, is_active')
      .eq('class_id', class_id)
      .eq('is_active', true)
      .single();

    if (sessionError || !session) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Session not found or not active' })
      };
    }

    // 2. Validate question_id matches current_question_id
    if (session.current_question_id !== question_id) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Question does not match current question' })
      };
    }

    // 3. Look up quiz data for this session's quiz type
    const quizData = QUIZ_DATA[session.quiz_type];
    if (!quizData) {
      console.error(`No quiz data for quiz_type: ${session.quiz_type}`);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Quiz data not available' })
      };
    }

    const question = quizData.find(q => q.id === parseInt(question_id));
    if (!question) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Question not found in quiz data' })
      };
    }

    // 4. Check if answer is correct
    // Find which option has isCorrect: true and get its letter (A, B, C, D)
    let correctAnswer = null;
    question.options.forEach((option, index) => {
      if (option.isCorrect === true) {
        correctAnswer = String.fromCharCode(65 + index);
      }
    });

    const is_correct = selected_option === correctAnswer;

    // 5. Get attempt number (how many times has this student tried this question?)
    const { data: previousAttempts, error: attemptError } = await supabase
      .from('question_responses')
      .select('attempt_number')
      .eq('session_id', session.id)
      .eq('question_id', question_id)
      .eq('email', emailValue)
      .order('attempt_number', { ascending: false })
      .limit(1);

    const attempt_number = (previousAttempts && previousAttempts.length > 0)
      ? previousAttempts[0].attempt_number + 1
      : 1;

    // 6. Insert response into question_responses table
    const { data: insertedResponse, error: insertError } = await supabase
      .from('question_responses')
      .insert({
        session_id: session.id,
        question_id: question_id,
        quiz_type: session.quiz_type,
        name: name,
        email: emailValue,
        selected_option: selected_option,
        is_correct: is_correct,
        time_spent_seconds: time_spent_seconds || 0,
        attempt_number: attempt_number,
        final_answer: is_correct  // Mark as final if correct
      });

    if (insertError) {
      console.error('Error inserting response:', insertError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to save response' })
      };
    }

    // 7. Build response
    const response = {
      success: true,
      is_correct: is_correct,
      attempt_number: attempt_number,
      can_retry: !is_correct,
      explanation: question.explanation || 'No explanation available',
      hint: !is_correct && question.hint ? question.hint : null
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
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
