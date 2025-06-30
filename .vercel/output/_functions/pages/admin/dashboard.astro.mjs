import { c as createComponent, a as createAstro, g as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BtpAGawn.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BTmrExAZ.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const session = Astro2.cookies.get("session");
  if (!session) {
    return Astro2.redirect("/admin/login");
  }
  let stats = {
    projects: { count: 0 },
    pages: { count: 0 },
    files: { count: 0 },
    resume: { count: 0 }
  };
  try {
    const response = await fetch(new URL("/api/admin/stats", Astro2.url), {
      headers: {
        Cookie: Astro2.request.headers.get("cookie") || ""
      }
    });
    if (response.ok) {
      stats = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
  const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard - Admin Panel", "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-content" data-astro-cid-x6qnsptu> <h1 class="page-title" data-astro-cid-x6qnsptu>Dashboard</h1> <!-- Welcome Message --> <div class="card welcome-card" data-astro-cid-x6qnsptu> <h2 data-astro-cid-x6qnsptu>Welcome back!</h2> <p data-astro-cid-x6qnsptu>Today is ${currentDate}</p> </div> <!-- Stats Grid --> <div class="stats-grid" data-astro-cid-x6qnsptu> <div class="stat-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Active Projects</h3> <div class="number" data-astro-cid-x6qnsptu>${stats.projects.count}</div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Pages</h3> <div class="number" data-astro-cid-x6qnsptu>${stats.pages.count}</div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Resume Entries</h3> <div class="number" data-astro-cid-x6qnsptu>${stats.resume.count}</div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Uploaded Files</h3> <div class="number" data-astro-cid-x6qnsptu>${stats.files.count}</div> </div> </div> <!-- Quick Actions --> <div class="card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Quick Actions</h3> <ul class="quick-actions" data-astro-cid-x6qnsptu> <li data-astro-cid-x6qnsptu><a href="/admin/pages/home" data-astro-cid-x6qnsptu>Edit Homepage Content</a></li> <li data-astro-cid-x6qnsptu><a href="/admin/projects/new" data-astro-cid-x6qnsptu>Add New Project</a></li> <li data-astro-cid-x6qnsptu><a href="/admin/resume/new" data-astro-cid-x6qnsptu>Add Resume Entry</a></li> <li data-astro-cid-x6qnsptu><a href="/admin/files" data-astro-cid-x6qnsptu>Upload Files</a></li> </ul> </div> <!-- Recent Activity (placeholder for future enhancement) --> <div class="card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Recent Activity</h3> <p class="text-muted" data-astro-cid-x6qnsptu>Activity tracking will be available in a future update.</p> </div> </div>  ` })}`;
}, "/home/davmosk/projects/my-resume/src/pages/admin/dashboard.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
