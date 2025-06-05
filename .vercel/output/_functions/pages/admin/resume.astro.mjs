import { c as createComponent, g as renderComponent, e as renderScript, f as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_C1lm3gvy.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__WaLF_7r.mjs';
import { a as allAsync } from '../../chunks/db-init_BmxtR14B.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Resume = createComponent(async ($$result, $$props, $$slots) => {
  let sections = [];
  try {
    sections = await allAsync("SELECT * FROM resume_sections ORDER BY section_type, display_order");
  } catch (error) {
    console.error("Error loading resume sections:", error);
    sections = [];
  }
  const sectionTypes = ["experience", "education", "skills", "certifications"];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Resume", "activePage": "resume", "data-astro-cid-7tymuthf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title" data-astro-cid-7tymuthf>Resume Management</h1>  <div id="messageContainer" class="message-container" style="display: none;" data-astro-cid-7tymuthf></div>  <div class="card" data-astro-cid-7tymuthf> <h2 data-astro-cid-7tymuthf>Add New Resume Section</h2> <form id="resumeForm" class="resume-form" data-astro-cid-7tymuthf> <div class="form-row" data-astro-cid-7tymuthf> <div class="form-group" data-astro-cid-7tymuthf> <label for="section_type" data-astro-cid-7tymuthf>Section Type *</label> <select id="section_type" name="section_type" required data-astro-cid-7tymuthf> <option value="" data-astro-cid-7tymuthf>Select Type</option> ${sectionTypes.map((type) => renderTemplate`<option${addAttribute(type, "value")} data-astro-cid-7tymuthf>${type.charAt(0).toUpperCase() + type.slice(1)}</option>`)} </select> </div> <div class="form-group" data-astro-cid-7tymuthf> <label for="title" data-astro-cid-7tymuthf>Title *</label> <input type="text" id="title" name="title" required data-astro-cid-7tymuthf> </div> </div> <div class="form-row" data-astro-cid-7tymuthf> <div class="form-group" data-astro-cid-7tymuthf> <label for="subtitle" data-astro-cid-7tymuthf>Subtitle</label> <input type="text" id="subtitle" name="subtitle" placeholder="Company/Institution" data-astro-cid-7tymuthf> </div> <div class="form-group" data-astro-cid-7tymuthf> <label for="date_range" data-astro-cid-7tymuthf>Date Range</label> <input type="text" id="date_range" name="date_range" placeholder="Jan 2020 - Present" data-astro-cid-7tymuthf> </div> </div> <div class="form-group" data-astro-cid-7tymuthf> <label for="description" data-astro-cid-7tymuthf>Description</label> <textarea id="description" name="description" rows="4" data-astro-cid-7tymuthf></textarea> </div> <div class="form-group" data-astro-cid-7tymuthf> <label for="details" data-astro-cid-7tymuthf>Details (HTML supported)</label> <textarea id="details" name="details" rows="6" data-astro-cid-7tymuthf></textarea> </div> <div class="form-row" data-astro-cid-7tymuthf> <div class="form-group" data-astro-cid-7tymuthf> <label for="display_order" data-astro-cid-7tymuthf>Display Order</label> <input type="number" id="display_order" name="display_order" min="0" value="0" data-astro-cid-7tymuthf> </div> <div class="form-group" data-astro-cid-7tymuthf> <label data-astro-cid-7tymuthf> <input type="checkbox" id="is_active" name="is_active" checked data-astro-cid-7tymuthf>
Active
</label> </div> </div> <button type="submit" class="btn btn-success" data-astro-cid-7tymuthf>Add Section</button> <button type="button" id="cancelEdit" class="btn btn-secondary" style="display: none;" data-astro-cid-7tymuthf>Cancel Edit</button> </form> </div>  <div class="card" data-astro-cid-7tymuthf> <h2 data-astro-cid-7tymuthf>Resume Sections</h2> <div class="sections-grid" data-astro-cid-7tymuthf> ${sectionTypes.map((type) => renderTemplate`<div class="section-group" data-astro-cid-7tymuthf> <h3 data-astro-cid-7tymuthf>${type.charAt(0).toUpperCase() + type.slice(1)}</h3> <div class="section-list" data-astro-cid-7tymuthf> ${sections.filter((s) => s.section_type === type).map((section) => renderTemplate`<div class="section-item"${addAttribute(section.id, "data-id")} data-astro-cid-7tymuthf> <div class="section-header" data-astro-cid-7tymuthf> <h4 data-astro-cid-7tymuthf>${section.title}</h4> ${section.subtitle && renderTemplate`<p class="subtitle" data-astro-cid-7tymuthf>${section.subtitle}</p>`} ${section.date_range && renderTemplate`<p class="date-range" data-astro-cid-7tymuthf>${section.date_range}</p>`} </div> <div class="section-actions" data-astro-cid-7tymuthf> <button class="btn btn-primary btn-sm edit-btn"${addAttribute(section.id, "data-id")} data-astro-cid-7tymuthf>Edit</button> <button class="btn btn-danger btn-sm delete-btn"${addAttribute(section.id, "data-id")} data-astro-cid-7tymuthf>Delete</button> <span${addAttribute(section.is_active ? "status-active" : "status-inactive", "class")} data-astro-cid-7tymuthf> ${section.is_active ? "Active" : "Inactive"} </span> </div> </div>`)} </div> </div>`)} </div> </div> ` })}  ${renderScript($$result, "/home/davmosk/projects/my-resume/src/pages/admin/resume.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/davmosk/projects/my-resume/src/pages/admin/resume.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/admin/resume.astro";
const $$url = "/admin/resume";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resume,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
