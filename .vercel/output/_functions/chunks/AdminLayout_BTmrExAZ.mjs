import { c as createComponent, a as createAstro, r as renderHead, b as addAttribute, d as renderSlot, e as renderScript, f as renderTemplate } from './astro/server_BtpAGawn.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, activePage = "" } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="stylesheet" href="/css/themes.css"><link rel="stylesheet" href="/css/admin.css"><link rel="stylesheet" href="/css/rich-editor.css">${renderHead()}</head> <body data-astro-cid-2kanml4j> <nav class="admin-nav" data-astro-cid-2kanml4j> <div class="nav-brand" data-astro-cid-2kanml4j> <h1 data-astro-cid-2kanml4j>Admin Panel</h1> </div> <ul class="nav-menu" data-astro-cid-2kanml4j> <li data-astro-cid-2kanml4j><a href="/admin/dashboard"${addAttribute(currentPath === "/admin/dashboard" ? "active" : "", "class")} data-astro-cid-2kanml4j>Dashboard</a></li> <li data-astro-cid-2kanml4j><a href="/admin/pages"${addAttribute(currentPath.startsWith("/admin/pages") ? "active" : "", "class")} data-astro-cid-2kanml4j>Pages</a></li> <li data-astro-cid-2kanml4j><a href="/admin/projects"${addAttribute(currentPath.startsWith("/admin/projects") ? "active" : "", "class")} data-astro-cid-2kanml4j>Projects</a></li> <li data-astro-cid-2kanml4j><a href="/admin/resume"${addAttribute(currentPath.startsWith("/admin/resume") ? "active" : "", "class")} data-astro-cid-2kanml4j>Resume</a></li> <li data-astro-cid-2kanml4j><a href="/admin/files"${addAttribute(currentPath === "/admin/files" ? "active" : "", "class")} data-astro-cid-2kanml4j>Files</a></li> <li data-astro-cid-2kanml4j><a href="/" target="_blank" data-astro-cid-2kanml4j>View Site</a></li> <li data-astro-cid-2kanml4j> <form action="/api/auth/logout" method="POST" style="display: inline;" data-astro-cid-2kanml4j> <button type="submit" class="logout-btn" data-astro-cid-2kanml4j>Logout</button> </form> </li> </ul> </nav> <main class="admin-main" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </main>  ${renderScript($$result, "/home/davmosk/projects/my-resume/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/davmosk/projects/my-resume/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
