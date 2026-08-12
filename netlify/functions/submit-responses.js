const { createClient } = require('@supabase/supabase-js');

// Allowed quiz types (whitelist to prevent injection)
const ALLOWED_QUIZ_TYPES = [
  'pretraining',
  'post_class',
  'fabric',
  'switch'
];

const RATE_LIMIT_PER_DAY = 500;

// Helper to add CORS headers to all responses
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

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get client IP
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0].trim() ||
                     event.headers['client-ip'] ||
                     'unknown';

    console.log('Submission from IP:', clientIp);

    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse the incoming data
    const data = JSON.parse(event.body);

    console.log('Submission data:', {
      hasName: !!data.name,
      hasScore: !!data.score,
      quizType: data.quiz_type,
      section: data.section
    });

    // Validate quiz_type parameter
    if (!data.quiz_type || !ALLOWED_QUIZ_TYPES.includes(data.quiz_type)) {
      console.error('Invalid quiz_type:', data.quiz_type);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid quiz_type parameter' })
      };
    }

    // Check rate limit
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('ip_address', clientIp)
      .eq('date', today)
      .single();

    if (rateLimitError && rateLimitError.code !== 'PGRST116') {
      // PGRST116 = no rows found (expected if first submission of the day)
      throw rateLimitError;
    }

    const currentCount = rateLimitData?.count || 0;

    if (currentCount >= RATE_LIMIT_PER_DAY) {
      console.warn(`Rate limit exceeded for IP ${clientIp}: ${currentCount} submissions today`);
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Rate limit exceeded. Maximum 500 submissions per day.',
          retryAfter: 86400
        })
      };
    }

    // Update or insert rate limit record
    if (currentCount > 0) {
      const { error: updateError } = await supabase
        .from('rate_limits')
        .update({ count: currentCount + 1 })
        .eq('ip_address', clientIp)
        .eq('date', today);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from('rate_limits')
        .insert([{ ip_address: clientIp, date: today, count: 1 }]);

      if (insertError) throw insertError;
    }

    // Insert submission into unified submissions table
    const submissionData = {
      quiz_type: data.quiz_type,
      section: data.section,
      name: data.name,
      email: data.email,
      score: data.score,
      total_questions: data.total_questions,
      correct_answers: data.correct_answers,
      duration_minutes: data.duration_minutes,
      topic_scores: data.topic_scores,
      responses: data.responses
    };

    console.log(`Inserting submission for quiz_type: ${data.quiz_type}`);

    const { data: result, error } = await supabase
      .from('submissions')
      .insert([submissionData]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    console.log('Submission successful');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Response recorded',
        submissionId: result?.[0]?.id
      })
    };

  } catch (error) {
    console.error('Function error:', error.message);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message })
    };
  }
};
