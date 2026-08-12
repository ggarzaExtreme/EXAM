const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const ALLOWED_QUIZ_TYPES = ['pretraining', 'post_class', 'fabric', 'switch'];

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
    const { token, quiz_type, days_back } = JSON.parse(event.body);

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

    // Validate quiz_type
    if (!ALLOWED_QUIZ_TYPES.includes(quiz_type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid quiz type' })
      };
    }

    // Get Supabase credentials
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

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build query
    let query = supabase
      .from('submissions')
      .select('*')
      .eq('quiz_type', quiz_type)
      .order('created_at', { ascending: false });

    // Filter by days_back if provided
    if (days_back && days_back > 0) {
      const cutoffDate = new Date(Date.now() - days_back * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', cutoffDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Fetch error:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to fetch submissions' })
      };
    }

    // Convert to CSV
    const csv = convertToCSV(data);

    // Return CSV with appropriate headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="submissions_${quiz_type}_${new Date().toISOString().split('T')[0]}.csv"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: csv
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

function convertToCSV(data) {
  if (!data || data.length === 0) {
    return 'No data to export';
  }

  // CSV header
  const headers = [
    'ID',
    'Date',
    'Name',
    'Email',
    'Score',
    'Percentage',
    'Total Questions',
    'Correct Answers',
    'Duration (min)',
    'Section',
    'Topic Scores',
    'Responses'
  ];

  // CSV rows
  const rows = data.map(row => [
    row.id,
    row.created_at ? new Date(row.created_at).toISOString() : '',
    `"${row.name || ''}"`,
    row.email || '',
    row.score,
    row.total_questions ? Math.round((row.correct_answers / row.total_questions) * 100) : '',
    row.total_questions,
    row.correct_answers,
    row.duration_minutes || '',
    row.section || '',
    row.topic_scores ? `"${JSON.stringify(row.topic_scores)}"` : '',
    row.responses ? `"${JSON.stringify(row.responses).replace(/"/g, '""')}"` : ''
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}
