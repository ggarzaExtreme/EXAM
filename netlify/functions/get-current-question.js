const { createClient } = require('@supabase/supabase-js');

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
    const { class_id } = JSON.parse(event.body);

    // Validate required fields
    if (!class_id) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required field: class_id' })
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

    // 1. Fetch the active class session
    const { data: session, error: sessionError } = await supabase
      .from('class_sessions')
      .select('id, quiz_type, current_question_id, current_section, is_active')
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

    // 2. If no current question, return null (waiting to start)
    if (!session.current_question_id) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          current_question_id: null,
          session_active: true,
          question_data: null,
          message: 'Waiting for instructor to start...'
        })
      };
    }

    // 3. Load quiz data and find the question
    let quizData;
    try {
      quizData = require(`../quiz_data_${session.quiz_type}.js`);
    } catch (err) {
      console.error(`Quiz data file not found: quiz_data_${session.quiz_type}.js`, err);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Quiz data not available' })
      };
    }

    const question = quizData.find(q => q.id === parseInt(session.current_question_id));
    if (!question) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Current question not found in quiz data' })
      };
    }

    // 4. Return question data (WITHOUT correct answer or feedback)
    // Strip out isCorrect and feedback from options for security
    const safeOptions = question.options.map(opt => {
      if (typeof opt === 'string') {
        return opt;
      }
      return { text: opt.text };
    });

    const questionData = {
      id: question.id,
      question: question.question,
      topic: question.topic,
      options: safeOptions
      // NOTE: isCorrect and feedback are NOT included - only revealed after student submits
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        current_question_id: session.current_question_id,
        current_section: session.current_section,
        session_active: true,
        question_data: questionData
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
