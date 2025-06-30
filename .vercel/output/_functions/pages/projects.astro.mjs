import { c as createComponent, g as renderComponent, f as renderTemplate, m as maybeRenderHead, e as renderScript, b as addAttribute } from '../chunks/astro/server_BtpAGawn.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Bu0ePrMp.mjs';
import { d as db } from '../chunks/db-init_BmxtR14B.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  let projects = [];
  try {
    const stmt = db.prepare("SELECT * FROM projects WHERE is_active = 1 ORDER BY display_order, id DESC");
    projects = stmt.all();
  } catch (err) {
    console.error("Error fetching projects:", err);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projects - Nadav Moskow", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` <link rel="stylesheet" href="/css/inline-expansion.css"> ${maybeRenderHead()}<div id="projects-page" data-astro-cid-aid3sr62> <div class="page-header" data-astro-cid-aid3sr62> <h1 data-astro-cid-aid3sr62>My Projects</h1> <p class="page-subtitle" data-astro-cid-aid3sr62>Click on any project to explore in detail</p> </div> <div class="card-grid" data-astro-cid-aid3sr62> ${projects.map((project) => renderTemplate`<div class="expandable-card"${addAttribute(project.id, "data-project-id")} data-astro-cid-aid3sr62> <div class="card-header" data-astro-cid-aid3sr62> <span class="card-icon" data-astro-cid-aid3sr62>${project.emoji || "\u{1F680}"}</span> <h3 class="card-title" data-astro-cid-aid3sr62>${project.title}</h3> ${project.subtitle && renderTemplate`<p class="card-subtitle" data-astro-cid-aid3sr62>${project.subtitle}</p>`} ${project.description && renderTemplate`<p class="card-description" data-astro-cid-aid3sr62>${project.description.substring(0, 100)}...</p>`} <div class="hover-overlay" data-astro-cid-aid3sr62></div> </div> <div class="card-content" data-astro-cid-aid3sr62> <div class="card-content-inner" data-astro-cid-aid3sr62> <button class="close-btn" aria-label="Close" data-astro-cid-aid3sr62>✕</button> <div class="project-details" data-astro-cid-aid3sr62> <div class="project-overview" data-astro-cid-aid3sr62> <h3 data-astro-cid-aid3sr62>Overview</h3> <p data-astro-cid-aid3sr62>${project.description || "No description available"}</p> </div> ${project.technologies && renderTemplate`<div class="project-technologies" data-astro-cid-aid3sr62> <h3 data-astro-cid-aid3sr62>Technologies</h3> <div class="tech-stack" data-astro-cid-aid3sr62> ${project.technologies.split(",").map((tech) => renderTemplate`<span class="tech-tag" data-astro-cid-aid3sr62>${tech.trim()}</span>`)} </div> </div>`} ${(project.github_link || project.live_link) && renderTemplate`<div class="project-links" data-astro-cid-aid3sr62> ${project.github_link && renderTemplate`<a${addAttribute(project.github_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link" data-astro-cid-aid3sr62> <span data-astro-cid-aid3sr62>📂</span> GitHub
</a>`} ${project.live_link && renderTemplate`<a${addAttribute(project.live_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link" data-astro-cid-aid3sr62> <span data-astro-cid-aid3sr62>🌐</span> Live Demo
</a>`} </div>`} </div> </div> </div> </div>`)} </div> </div> ${renderScript($$result2, "/home/davmosk/projects/my-resume/src/pages/projects.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/home/davmosk/projects/my-resume/src/pages/projects.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
