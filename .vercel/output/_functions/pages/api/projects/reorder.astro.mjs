import { r as runAsync } from '../../../chunks/db-init_BmxtR14B.mjs';
import { g as getSession } from '../../../chunks/auth_DVQDy8PW.mjs';
export { renderers } from '../../../renderers.mjs';

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

async function POST({ request }) {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { updates } = await request.json();
    
    for (const update of updates) {
      await runAsync(
        'UPDATE projects SET display_order = ? WHERE id = ?',
        [update.display_order, update.id]
      );
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Reorder projects error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update order' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
