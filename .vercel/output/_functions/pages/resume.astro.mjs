import { c as createComponent, g as renderComponent, f as renderTemplate, m as maybeRenderHead, e as renderScript, F as Fragment, b as addAttribute } from '../chunks/astro/server_BtpAGawn.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Bu0ePrMp.mjs';
import { d as db } from '../chunks/db-init_BmxtR14B.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Resume = createComponent(($$result, $$props, $$slots) => {
  let groupedSections = {};
  let error = null;
  let stats = { years: 0, companies: 0, roles: 0 };
  try {
    const sections = db.prepare(`
        SELECT * FROM resume_sections 
        WHERE is_active = 1 
        ORDER BY section_type, display_order
    `).all();
    groupedSections = sections.reduce((acc, section) => {
      if (!acc[section.section_type]) {
        acc[section.section_type] = [];
      }
      acc[section.section_type].push({
        id: section.id,
        type: section.section_type,
        title: section.title,
        subtitle: section.subtitle,
        date_range: section.date_range,
        description: section.description,
        details: section.details
      });
      return acc;
    }, {});
    let companies = /* @__PURE__ */ new Set();
    let oldestDate = /* @__PURE__ */ new Date();
    let yearsExp = 0;
    if (groupedSections.experience && groupedSections.experience.length > 0) {
      groupedSections.experience.forEach((job) => {
        if (job.subtitle) {
          const company = job.subtitle.split(" - ")[0];
          companies.add(company);
        }
        if (job.date_range) {
          const dateMatch = job.date_range.match(/(\d{4})/);
          if (dateMatch) {
            const year = parseInt(dateMatch[1]);
            const jobDate = new Date(year, 0, 1);
            if (jobDate < oldestDate) oldestDate = jobDate;
          }
        }
      });
      yearsExp = (/* @__PURE__ */ new Date()).getFullYear() - oldestDate.getFullYear();
    }
    stats = {
      years: yearsExp > 0 ? yearsExp : 1,
      companies: companies.size,
      roles: groupedSections.experience ? groupedSections.experience.length : 0
    };
  } catch (err) {
    console.error("Error fetching resume sections:", err);
    error = err.message;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Resume - Nadav Moskow", "data-astro-cid-ruvg6z4q": true }, { "default": ($$result2) => renderTemplate` <link rel="stylesheet" href="/css/inline-expansion.css"> ${maybeRenderHead()}<div id="resume-dashboard" data-astro-cid-ruvg6z4q> ${error ? renderTemplate`<div class="error-message" data-astro-cid-ruvg6z4q> <p data-astro-cid-ruvg6z4q>Error loading resume data: ${error}</p> </div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ruvg6z4q": true }, { "default": ($$result3) => renderTemplate`  <div class="summary-stats-section" data-astro-cid-ruvg6z4q> <div class="summary-stats"${addAttribute(stats.years, "data-years")}${addAttribute(stats.companies, "data-companies")}${addAttribute(stats.roles, "data-roles")} data-astro-cid-ruvg6z4q> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="years-exp" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Years Experience</div> </div> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="companies-count" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Companies</div> </div> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="roles-count" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Roles</div> </div> </div> <!-- Download Button --> <a href="/images/Nadav Moskow - Resume.pdf" target="_blank" download data-astro-cid-ruvg6z4q> <button class="download-btn" data-astro-cid-ruvg6z4q> <span data-astro-cid-ruvg6z4q>📄</span>
Download PDF Resume
</button> </a> </div>  <div class="card-grid" data-astro-cid-ruvg6z4q> <!-- Experience Card --> <div class="expandable-card resume-section" data-section="experience" data-astro-cid-ruvg6z4q> <div class="card-header" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>💼</span> <h3 class="card-title" data-astro-cid-ruvg6z4q>Experience</h3> <p class="card-subtitle" data-astro-cid-ruvg6z4q>${stats.years} years across ${stats.companies} companies</p> <div class="hover-overlay" data-astro-cid-ruvg6z4q></div> </div> <div class="card-content" data-astro-cid-ruvg6z4q> <div class="card-content-inner" data-astro-cid-ruvg6z4q> <button class="close-btn" aria-label="Close" data-astro-cid-ruvg6z4q>✕</button> <div class="section-content" data-astro-cid-ruvg6z4q> ${groupedSections.experience && groupedSections.experience.map((job) => renderTemplate`<div class="job-item"${addAttribute(job.id, "data-job-id")} data-astro-cid-ruvg6z4q> <div class="job-header" data-astro-cid-ruvg6z4q> <div class="job-info" data-astro-cid-ruvg6z4q> <h4 class="job-title" data-astro-cid-ruvg6z4q>${job.title}</h4> <p class="job-company" data-astro-cid-ruvg6z4q>${job.subtitle || ""}</p> </div> <div class="job-meta" data-astro-cid-ruvg6z4q> <p class="job-period" data-astro-cid-ruvg6z4q>${job.date_range || ""}</p> <span class="expand-icon" data-astro-cid-ruvg6z4q>▼</span> </div> </div> <div class="job-details" data-astro-cid-ruvg6z4q> <div class="job-details-inner" data-astro-cid-ruvg6z4q> <p class="job-description" data-astro-cid-ruvg6z4q>${job.description || ""}</p> ${job.details && renderTemplate`<ul class="responsibilities" data-astro-cid-ruvg6z4q> ${job.details.split("\n").filter((detail) => detail.trim()).map((detail) => renderTemplate`<li data-astro-cid-ruvg6z4q>${detail}</li>`)} </ul>`} </div> </div> </div>`)} </div> </div> </div> </div> <!-- Skills Card --> <div class="expandable-card resume-section" data-section="skills" data-astro-cid-ruvg6z4q> <div class="card-header" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🛠️</span> <h3 class="card-title" data-astro-cid-ruvg6z4q>Skills & Tools</h3> <p class="card-subtitle" data-astro-cid-ruvg6z4q>Technologies & Expertise</p> <div class="hover-overlay" data-astro-cid-ruvg6z4q></div> </div> <div class="card-content" data-astro-cid-ruvg6z4q> <div class="card-content-inner" data-astro-cid-ruvg6z4q> <button class="close-btn" aria-label="Close" data-astro-cid-ruvg6z4q>✕</button> <div class="section-content" data-astro-cid-ruvg6z4q> <div class="skills-grid" data-astro-cid-ruvg6z4q> ${groupedSections.skills && groupedSections.skills.map((skill) => renderTemplate`<div class="skill-category" data-astro-cid-ruvg6z4q> <h4 data-astro-cid-ruvg6z4q>${skill.title}</h4> <div class="skill-tags" data-astro-cid-ruvg6z4q> ${skill.description && skill.description.split(",").map((tech) => renderTemplate`<span class="skill-tag" data-astro-cid-ruvg6z4q>${tech.trim()}</span>`)} </div> </div>`)} </div> </div> </div> </div> </div> <!-- Achievements Card --> <div class="expandable-card resume-section" data-section="achievements" data-astro-cid-ruvg6z4q> <div class="card-header" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🏆</span> <h3 class="card-title" data-astro-cid-ruvg6z4q>Achievements</h3> <p class="card-subtitle" data-astro-cid-ruvg6z4q>Notable Accomplishments</p> <div class="hover-overlay" data-astro-cid-ruvg6z4q></div> </div> <div class="card-content" data-astro-cid-ruvg6z4q> <div class="card-content-inner" data-astro-cid-ruvg6z4q> <button class="close-btn" aria-label="Close" data-astro-cid-ruvg6z4q>✕</button> <div class="section-content" data-astro-cid-ruvg6z4q> ${groupedSections.achievements && groupedSections.achievements.map((achievement) => renderTemplate`<div class="achievement-item" data-astro-cid-ruvg6z4q> <h4 data-astro-cid-ruvg6z4q>${achievement.title}</h4> ${achievement.subtitle && renderTemplate`<p class="subtitle" data-astro-cid-ruvg6z4q>${achievement.subtitle}</p>`} <p data-astro-cid-ruvg6z4q>${achievement.description || ""}</p> </div>`)} ${groupedSections.courses && groupedSections.courses.map((course) => renderTemplate`<div class="achievement-item" data-astro-cid-ruvg6z4q> <h4 data-astro-cid-ruvg6z4q>${course.title}</h4> ${course.subtitle && renderTemplate`<p class="subtitle" data-astro-cid-ruvg6z4q>${course.subtitle}</p>`} <p data-astro-cid-ruvg6z4q>${course.description || ""}</p> </div>`)} </div> </div> </div> </div> <!-- Education Card --> <div class="expandable-card resume-section" data-section="education" data-astro-cid-ruvg6z4q> <div class="card-header" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🎓</span> <h3 class="card-title" data-astro-cid-ruvg6z4q>Education</h3> <p class="card-subtitle" data-astro-cid-ruvg6z4q>Academic Background</p> <div class="hover-overlay" data-astro-cid-ruvg6z4q></div> </div> <div class="card-content" data-astro-cid-ruvg6z4q> <div class="card-content-inner" data-astro-cid-ruvg6z4q> <button class="close-btn" aria-label="Close" data-astro-cid-ruvg6z4q>✕</button> <div class="section-content" data-astro-cid-ruvg6z4q> ${groupedSections.education && groupedSections.education.map((edu) => renderTemplate`<div class="education-item" data-astro-cid-ruvg6z4q> <h4 data-astro-cid-ruvg6z4q>${edu.title}</h4> <p class="degree" data-astro-cid-ruvg6z4q>${edu.subtitle || ""}</p> <p class="period" data-astro-cid-ruvg6z4q>${edu.date_range || ""}</p> ${edu.description && renderTemplate`<p class="description" data-astro-cid-ruvg6z4q>${edu.description}</p>`} </div>`)} </div> </div> </div> </div> </div> ` })}`} </div> ${renderScript($$result2, "/home/davmosk/projects/my-resume/src/pages/resume.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/home/davmosk/projects/my-resume/src/pages/resume.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/resume.astro";
const $$url = "/resume";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resume,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
