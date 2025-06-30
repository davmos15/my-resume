import 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Simple in-memory session store (in production, use Redis or a database)
const sessions = new Map();

function createSession(userId) {
  const sessionId = crypto.randomUUID();
  const sessionData = {
    userId,
    createdAt: Date.now(),
    lastAccess: Date.now()
  };
  sessions.set(sessionId, sessionData);
  return sessionId;
}

function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (session) {
    // Update last access time
    session.lastAccess = Date.now();
    // Check if session is expired (24 hours)
    if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
      sessions.delete(sessionId);
      return null;
    }
    return session;
  }
  return null;
}

function deleteSession(sessionId) {
  sessions.delete(sessionId);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export { createSession as c, deleteSession as d, getSession as g, verifyPassword as v };
