const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

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
    const { token, quiz_type, mode, limit, offset, section } = JSON.parse(event.body);

    if (!token || !quiz_type) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Token and quiz_type required' })
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

    // Validate quiz_type to prevent injection
    if (!ALLOWED_QUIZ_TYPES.includes(quiz_type)) {
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
