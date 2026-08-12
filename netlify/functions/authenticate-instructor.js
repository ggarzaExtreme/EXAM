const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password required' })
      };
    }

    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    if (!supabaseUrl || !supabaseKey || !jwtSecret) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      };
    }

    if (!data.session) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authentication failed' })
      };
    }

    // Create JWT token with 24-hour expiration
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const token = jwt.sign(
      {
        userId: data.user.id,
        email: data.user.email,
        exp: Math.floor(expiresAt.getTime() / 1000)
      },
      jwtSecret,
      { algorithm: 'HS256' }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: token,
        userId: data.user.id,
        email: data.user.email,
        expiresAt: expiresAt.toISOString()
      })
    };

  } catch (error) {
    console.error('Auth error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication service error' })
    };
  }
};
