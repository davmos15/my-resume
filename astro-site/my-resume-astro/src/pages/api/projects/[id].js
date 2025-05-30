import { getAsync, runAsync } from '../../../lib/db.js';
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

export async function GET({ params, request }) {
  const { id } = params;
  
  try {
    const project = await getAsync('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(project), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function PUT({ params, request }) {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { id } = params;
  
  try {
    const data = await request.json();
    const { title, emoji, subtitle, description, technologies, github_link, live_link, display_order, is_active, image_path } = data;
    
    await runAsync(
      `UPDATE projects SET title = ?, emoji = ?, subtitle = ?, description = ?, technologies = ?, 
       github_link = ?, live_link = ?, display_order = ?, is_active = ?, image_path = ?
       WHERE id = ?`,
      [title, emoji || '🚀', subtitle || null, description, technologies, github_link || null, live_link || null, 
       display_order || 0, is_active ? 1 : 0, image_path || null, id]
    );
    
    return new Response(JSON.stringify({ success: true, message: 'Project updated successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to update project' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE({ params, request }) {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { id } = params;
  
  try {
    await runAsync('DELETE FROM projects WHERE id = ?', [id]);
    
    return new Response(JSON.stringify({ success: true, message: 'Project deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete project' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}