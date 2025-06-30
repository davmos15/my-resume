import { c as createComponent, r as renderHead, e as renderScript, f as renderTemplate } from '../../chunks/astro/server_BtpAGawn.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login</title><link rel="stylesheet" href="/css/themes.css"><link rel="stylesheet" href="/css/admin.css">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-container" data-astro-cid-rf56lckb> <h2 style="text-align: center; margin-bottom: 30px;" data-astro-cid-rf56lckb>Admin Login</h2> <div id="alert" class="alert" data-astro-cid-rf56lckb></div> <form id="loginForm" class="login-form" data-astro-cid-rf56lckb> <input type="text" name="username" placeholder="Username" required autofocus data-astro-cid-rf56lckb> <input type="password" name="password" placeholder="Password" required data-astro-cid-rf56lckb> <button type="submit" id="submitBtn" data-astro-cid-rf56lckb>Login</button> </form> <p style="text-align: center; margin-top: 20px;" data-astro-cid-rf56lckb> <a href="/" style="color: #666;" data-astro-cid-rf56lckb>← Back to site</a> </p> </div> ${renderScript($$result, "/home/davmosk/projects/my-resume/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/davmosk/projects/my-resume/src/pages/admin/login.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
