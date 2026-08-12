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
    const { token, class_id } = JSON.parse(event.body);

    // Validate required fields
    if (!token || !class_id) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields: token, class_id' })
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

    // 1. Fetch the ACTIVE session and verify instructor owns it.
    // The is_active filter is required: class_ids are reusable across ended
    // sessions, so without it this query can match multiple rows and .single()
    // errors — which would make the session impossible to end.
    const { data: session, error: sessionError } = await supabase
      .from('class_sessions')
      .select('id, quiz_type, is_active')
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

    // 2. Get final statistics for the session
    const { data: allResponses, error: statsError } = await supabase
      .from('question_responses')
      .select('is_correct, attempt_number, question_id')
      .eq('session_id', session.id);

    let finalStats = {
      total_questions_presented: 0,
      total_responses: allResponses ? allResponses.length : 0,
      correct_final: allResponses ? allResponses.filter(r => r.is_correct).length : 0,
      accuracy_rate: 0,
      avg_attempts: 0
    };

    if (allResponses && allResponses.length > 0) {
      finalStats.total_questions_presented = new Set(allResponses.map(r => r.question_id)).size;
      const attempts = allResponses.map(r => r.attempt_number);
      finalStats.avg_attempts = Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length * 10) / 10;
      finalStats.accuracy_rate = Math.round((finalStats.correct_final / allResponses.length) * 100);
    }

    // 3. Mark session as inactive
    const { data: updatedSession, error: updateError } = await supabase
      .from('class_sessions')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error ending session:', updateError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to end session' })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        session_id: updatedSession.id,
        class_id: updatedSession.class_id,
        final_stats: finalStats
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
