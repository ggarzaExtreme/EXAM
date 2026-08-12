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
    const { token, quiz_type, class_id, session_name } = JSON.parse(event.body);

    // Validate required fields
    if (!token || !quiz_type || !class_id) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields: token, quiz_type, class_id' })
      };
    }

    // Validate quiz_type (must have a matching quiz data file)
    const validQuizTypes = ['fabric', 'switch'];
    if (!validQuizTypes.includes(quiz_type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Invalid quiz_type. Must be one of: ${validQuizTypes.join(', ')}` })
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

    // Check if class_id is already in use by an active session
    const { data: existingSession, error: checkError } = await supabase
      .from('class_sessions')
      .select('id, instructor_id, quiz_type, session_name, current_question_id, current_section, created_at')
      .eq('class_id', class_id)
      .eq('is_active', true)
      .single();

    if (existingSession) {
      // Same instructor reconnecting (e.g. after a page refresh) — resume it
      if (existingSession.instructor_id === decoded.userId) {
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            success: true,
            resumed: true,
            session_id: existingSession.id,
            class_id: class_id,
            quiz_type: existingSession.quiz_type,
            session_name: existingSession.session_name,
            current_question_id: existingSession.current_question_id,
            current_section: existingSession.current_section,
            is_active: true,
            created_at: existingSession.created_at
          })
        };
      }

      return {
        statusCode: 409,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Class ID already in use by another instructor\'s active session' })
      };
    }

    // Create new class session
    const { data: newSession, error: createError } = await supabase
      .from('class_sessions')
      .insert({
        class_id: class_id,
        instructor_id: decoded.userId,
        quiz_type: quiz_type,
        session_name: session_name || `${quiz_type} Session`,
        current_question_id: null,  // Instructor will advance to first question
        is_active: true
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating session:', createError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to create session' })
      };
    }

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        session_id: newSession.id,
        class_id: newSession.class_id,
        quiz_type: newSession.quiz_type,
        session_name: newSession.session_name,
        current_question_id: null,
        is_active: true,
        created_at: newSession.created_at
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
