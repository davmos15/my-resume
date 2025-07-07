import { verifyPassword, createSession } from '../../../middleware/auth.js';
import { getAsync } from '../../../lib/db.js';
import dotenv from 'dotenv';

dotenv.config();

export async function POST({ request }) {
  try {
    const { username, password } = await request.json();
    
    // Validate input
    if (!username || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Username and password are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check credentials against database
    const user = await getAsync('SELECT * FROM users WHERE username = ?', [username]);
    
    if (!user || !verifyPassword(password, user.password)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid username or password' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create session with user ID
    const sessionId = createSession(user.id);
    
    if (!sessionId) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Failed to create session' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Login successful' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}