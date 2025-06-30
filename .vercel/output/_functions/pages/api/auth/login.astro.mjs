import { v as verifyPassword, c as createSession } from '../../../chunks/auth_DVQDy8PW.mjs';
import dotenv from 'dotenv';
export { renderers } from '../../../renderers.mjs';

dotenv.config();

async function POST({ request }) {
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
    
    // Check credentials
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    
    if (username !== adminUsername || !verifyPassword(password, adminPasswordHash)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid username or password' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create session
    const sessionId = createSession(username);
    
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
