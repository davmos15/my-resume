import { c as createComponent, g as renderComponent, e as renderScript, f as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_C1lm3gvy.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__WaLF_7r.mjs';
import { a as allAsync } from '../../chunks/db-init_BmxtR14B.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  let projects = [];
  try {
    projects = await allAsync("SELECT * FROM projects ORDER BY display_order, id DESC");
  } catch (error) {
    console.error("Error loading projects:", error);
    projects = [];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Projects", "activePage": "projects", "data-astro-cid-jm74fzil": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title" data-astro-cid-jm74fzil>Projects</h1>  <div id="messageContainer" class="message-container" style="display: none;" data-astro-cid-jm74fzil></div>  <div class="card" data-astro-cid-jm74fzil> <h2 data-astro-cid-jm74fzil>Add New Project</h2> <form id="projectForm" class="project-form" data-astro-cid-jm74fzil> <div class="form-row" data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil> <label for="title" data-astro-cid-jm74fzil>Title *</label> <input type="text" id="title" name="title" required data-astro-cid-jm74fzil> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="emoji" data-astro-cid-jm74fzil>Emoji</label> <input type="text" id="emoji" name="emoji" placeholder="🚀" maxlength="4" data-astro-cid-jm74fzil> </div> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="subtitle" data-astro-cid-jm74fzil>Subtitle</label> <input type="text" id="subtitle" name="subtitle" data-astro-cid-jm74fzil> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="description" data-astro-cid-jm74fzil>Description *</label> <textarea id="description" name="description" rows="4" required data-astro-cid-jm74fzil></textarea> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="technologies" data-astro-cid-jm74fzil>Technologies *</label> <input type="text" id="technologies" name="technologies" placeholder="React, Node.js, MongoDB" required data-astro-cid-jm74fzil> </div> <div class="form-row" data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil> <label for="github_link" data-astro-cid-jm74fzil>GitHub Link</label> <input type="url" id="github_link" name="github_link" data-astro-cid-jm74fzil> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="live_link" data-astro-cid-jm74fzil>Live Link</label> <input type="url" id="live_link" name="live_link" data-astro-cid-jm74fzil> </div> </div> <div class="form-row" data-astro-cid-jm74fzil> <div class="form-group" data-astro-cid-jm74fzil> <label for="image_path" data-astro-cid-jm74fzil>Image Path</label> <input type="text" id="image_path" name="image_path" placeholder="/images/project.jpg" data-astro-cid-jm74fzil> </div> <div class="form-group" data-astro-cid-jm74fzil> <label for="display_order" data-astro-cid-jm74fzil>Display Order</label> <input type="number" id="display_order" name="display_order" min="0" value="0" data-astro-cid-jm74fzil> </div> </div> <button type="submit" class="btn btn-success" data-astro-cid-jm74fzil>Add Project</button> <button type="button" id="cancelEdit" class="btn btn-secondary" style="display: none;" data-astro-cid-jm74fzil>Cancel Edit</button> </form> </div>  <div class="card" data-astro-cid-jm74fzil> <div class="sortable-table" data-astro-cid-jm74fzil> <table class="table" data-astro-cid-jm74fzil> <thead data-astro-cid-jm74fzil> <tr data-astro-cid-jm74fzil> <th width="30px" data-astro-cid-jm74fzil>⋮⋮</th> <th data-astro-cid-jm74fzil>Title</th> <th data-astro-cid-jm74fzil>Technologies</th> <th data-astro-cid-jm74fzil>Status</th> <th data-astro-cid-jm74fzil>Order</th> <th data-astro-cid-jm74fzil>Actions</th> </tr> </thead> <tbody id="sortable-projects" data-astro-cid-jm74fzil> ${projects && projects.length > 0 ? projects.map((project) => renderTemplate`<tr${addAttribute(project.id, "data-id")} class="sortable-row" data-astro-cid-jm74fzil> <td class="drag-handle" style="cursor: move;" data-astro-cid-jm74fzil>⋮⋮</td> <td data-astro-cid-jm74fzil>${project.emoji || "\u{1F680}"} ${project.title}</td> <td data-astro-cid-jm74fzil>${project.technologies || "N/A"}</td> <td data-astro-cid-jm74fzil> <span${addAttribute(project.is_active ? "status-active" : "status-inactive", "class")} data-astro-cid-jm74fzil> ${project.is_active ? "Active" : "Inactive"} </span> </td> <td data-astro-cid-jm74fzil>${project.display_order}</td> <td data-astro-cid-jm74fzil> <div class="actions" data-astro-cid-jm74fzil> <button class="btn btn-primary btn-sm edit-btn"${addAttribute(project.id, "data-id")} data-astro-cid-jm74fzil>Edit</button> <button class="btn btn-danger btn-sm delete-btn"${addAttribute(project.id, "data-id")} data-astro-cid-jm74fzil>Delete</button> </div> </td> </tr>`) : renderTemplate`<tr data-astro-cid-jm74fzil> <td colspan="6" style="text-align: center;" data-astro-cid-jm74fzil>No projects found</td> </tr>`} </tbody> </table> </div> </div> ` })}  ${renderScript($$result, "/home/davmosk/projects/my-resume/src/pages/admin/projects.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/home/davmosk/projects/my-resume/src/pages/admin/projects.astro?astro&type=script&index=1&lang.ts")} `;
}, "/home/davmosk/projects/my-resume/src/pages/admin/projects.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/admin/projects.astro";
const $$url = "/admin/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
