import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../lib/db-init.js';

export function createSession(userId) {
  const sessionId = crypto.randomUUID();
  const now = Date.now();
  const expiresAt = now + (24 * 60 * 60 * 1000); // 24 hours
  
  try {
    // Clean up expired sessions first
    db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);
    
    // Create new session
    db.prepare(
      'INSERT INTO sessions (id, user_id, created_at, last_access, expires_at) VALUES (?, ?, ?, ?, ?)'
    ).run(sessionId, userId, now, now, expiresAt);
    
    return sessionId;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
}

export function getSession(sessionId) {
  try {
    const now = Date.now();
    
    // Get session and check if it exists and is not expired
    const session = db.prepare(
      'SELECT * FROM sessions WHERE id = ? AND expires_at > ?'
    ).get(sessionId, now);
    
    if (session) {
      // Update last access time
      db.prepare(
        'UPDATE sessions SET last_access = ? WHERE id = ?'
      ).run(now, sessionId);
      
      return {
        userId: session.user_id,
        createdAt: session.created_at,
        lastAccess: now
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export function deleteSession(sessionId) {
  try {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '24h'
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
}

// Middleware to check if user is authenticated
export function requireAuth(handler) {
  return async (context) => {
    const { request } = context;
    const cookies = parseCookies(request.headers.get('cookie') || '');
    const sessionId = cookies.session;
    
    if (!sessionId || !getSession(sessionId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return handler(context);
  };
}

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}