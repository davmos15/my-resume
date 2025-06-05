import { d as deleteSession } from '../../../chunks/auth_DVQDy8PW.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  const cookies = parseCookies(request.headers.get('cookie') || '');
  const sessionId = cookies.session;
  
  if (sessionId) {
    deleteSession(sessionId);
  }
  
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Logged out successfully' 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
    }
  });
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
