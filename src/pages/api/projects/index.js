import { getAsync, runAsync, allAsync } from '../../../lib/db.js';
import { getSession } from '../../../middleware/auth.js';

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

function isAuthenticated(request) {
  const cookies = parseCookies(request.headers.get('cookie') || '');
  const sessionId = cookies.session;
  return sessionId && getSession(sessionId);
}

export async function GET({ request }) {
  // Get all projects for admin
  try {
    const projects = await allAsync('SELECT * FROM projects ORDER BY display_order, id DESC');
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST({ request }) {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const data = await request.json();
    const { title, emoji, subtitle, description, technologies, github_link, live_link, display_order, image_path, is_active } = data;
    
    await runAsync(
      `INSERT INTO projects (title, emoji, subtitle, description, technologies, github_link, live_link, display_order, image_path, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, emoji || '🚀', subtitle || null, description, technologies, github_link || null, live_link || null, display_order || 0, image_path || null, is_active ? 1 : 0]
    );
    
    return new Response(JSON.stringify({ success: true, message: 'Project created successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to create project' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}