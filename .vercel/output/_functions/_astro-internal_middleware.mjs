import { g as getSession } from './chunks/auth_DVQDy8PW.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BdYg3Ee0.mjs';
import 'kleur/colors';
import './chunks/astro/server_C1lm3gvy.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_BSHZ-6kx.mjs';

async function onRequest$1({ request, redirect }, next) {
  const url = new URL(request.url);
  
  // Check if this is an admin route
  if (url.pathname.startsWith('/admin/') && url.pathname !== '/admin/login') {
    const cookies = parseCookies(request.headers.get('cookie') || '');
    const sessionId = cookies.session;
    
    if (!sessionId || !getSession(sessionId)) {
      return redirect('/admin/login');
    }
  }
  
  return next();
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

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
