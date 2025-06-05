import { c as createComponent, g as renderComponent, f as renderTemplate, m as maybeRenderHead, e as renderScript, F as Fragment, b as addAttribute, u as unescapeHTML } from '../chunks/astro/server_C1lm3gvy.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DB5JEVk1.mjs';
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Resume - Nadav Moskow", "data-astro-cid-ruvg6z4q": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="resume-dashboard" data-astro-cid-ruvg6z4q> ${error ? renderTemplate`<div class="error-message" data-astro-cid-ruvg6z4q> <p data-astro-cid-ruvg6z4q>Error loading resume data: ${error}</p> </div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ruvg6z4q": true }, { "default": ($$result3) => renderTemplate`  <div class="summary-stats-section" data-astro-cid-ruvg6z4q> <div class="summary-stats"${addAttribute(stats.years, "data-years")}${addAttribute(stats.companies, "data-companies")}${addAttribute(stats.roles, "data-roles")} data-astro-cid-ruvg6z4q> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="years-exp" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Years Experience</div> </div> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="companies-count" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Companies</div> </div> <div class="stat-item" data-astro-cid-ruvg6z4q> <div class="stat-number" id="roles-count" data-astro-cid-ruvg6z4q>0</div> <div class="stat-label" data-astro-cid-ruvg6z4q>Roles</div> </div> </div> <!-- Download Button --> <a href="/images/Nadav Moskow - Resume.pdf" target="_blank" download data-astro-cid-ruvg6z4q> <button class="download-btn" data-astro-cid-ruvg6z4q> <span data-astro-cid-ruvg6z4q>📄</span>
Download PDF Resume
</button> </a> </div>  <div class="dashboard-grid" data-astro-cid-ruvg6z4q> <!-- Professional Experience Card --> <div class="dashboard-card" data-card="experience" id="Experience" data-astro-cid-ruvg6z4q> <div class="card-header clickable-header" data-astro-cid-ruvg6z4q> <div class="header-content" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>💼</span> <h2 class="card-title" data-astro-cid-ruvg6z4q>Experience</h2> </div> <button class="collapse-toggle" aria-label="Toggle section" data-astro-cid-ruvg6z4q>+</button> </div> <div class="card-divider" data-astro-cid-ruvg6z4q></div> <div class="card-content" data-astro-cid-ruvg6z4q> <!-- Job List --> <div class="experience-list" data-astro-cid-ruvg6z4q> ${groupedSections.experience && groupedSections.experience.length > 0 && groupedSections.experience.map((job, index) => renderTemplate`<div class="job-item collapsible-job" data-astro-cid-ruvg6z4q> <div class="job-header"${addAttribute(index, "data-job")} data-astro-cid-ruvg6z4q> <div class="job-header-content" data-astro-cid-ruvg6z4q> <h3 class="job-title" data-astro-cid-ruvg6z4q>${job.title}</h3> <div class="job-meta-centered" data-astro-cid-ruvg6z4q> ${job.subtitle && renderTemplate`<span class="job-company" data-astro-cid-ruvg6z4q>${job.subtitle}</span>`} ${job.date_range && renderTemplate`<span class="job-dates" data-astro-cid-ruvg6z4q>${job.date_range}</span>`} </div> </div> <button class="job-toggle" aria-label="Toggle job details" data-astro-cid-ruvg6z4q>+</button> </div> <div class="job-content"${addAttribute(`job-${index}`, "id")} data-astro-cid-ruvg6z4q> <div class="job-description" data-astro-cid-ruvg6z4q>${unescapeHTML(job.description)}</div> </div> </div>`)} </div> </div> <div class="card-hover-overlay" data-astro-cid-ruvg6z4q> <span class="view-details-text" data-astro-cid-ruvg6z4q>View Details →</span> </div> </div> <!-- Skills & Technologies Card --> <div class="dashboard-card" data-card="skills" id="Skills" data-astro-cid-ruvg6z4q> <div class="card-header clickable-header" data-astro-cid-ruvg6z4q> <div class="header-content" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🛠️</span> <h2 class="card-title" data-astro-cid-ruvg6z4q>Skills & Tools</h2> </div> <button class="collapse-toggle" aria-label="Toggle section" data-astro-cid-ruvg6z4q>+</button> </div> <div class="card-divider" data-astro-cid-ruvg6z4q></div> <div class="card-content" data-astro-cid-ruvg6z4q> ${groupedSections.skills && groupedSections.skills.length > 0 && renderTemplate`<div class="skills-sections" data-astro-cid-ruvg6z4q> ${groupedSections.skills.map((skill, index) => renderTemplate`<div class="skill-section" data-astro-cid-ruvg6z4q> <div class="skill-header clickable-skill-header"${addAttribute(index, "data-skill")} data-astro-cid-ruvg6z4q> <h3 class="skill-category" data-astro-cid-ruvg6z4q>${skill.title}</h3> <button class="skill-toggle"${addAttribute(index, "data-skill")} aria-label="Toggle skill section" data-astro-cid-ruvg6z4q>+</button> </div> <div class="skill-content"${addAttribute(`skill-${index}`, "id")} data-astro-cid-ruvg6z4q>${unescapeHTML(skill.description)}</div> </div>`)} </div>`} </div> <div class="card-hover-overlay" data-astro-cid-ruvg6z4q> <span class="view-details-text" data-astro-cid-ruvg6z4q>View Details →</span> </div> </div> <!-- Achievements & Certifications Card --> <div class="dashboard-card" data-card="achievements" id="Courses" data-astro-cid-ruvg6z4q> <div class="card-header clickable-header" data-astro-cid-ruvg6z4q> <div class="header-content" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🏆</span> <h2 class="card-title" data-astro-cid-ruvg6z4q>Courses & Achievements</h2> </div> <button class="collapse-toggle" aria-label="Toggle section" data-astro-cid-ruvg6z4q>+</button> </div> <div class="card-divider" data-astro-cid-ruvg6z4q></div> <div class="card-content" data-astro-cid-ruvg6z4q> ${groupedSections.courses && groupedSections.courses.length > 0 && renderTemplate`<div class="achievements-list" data-astro-cid-ruvg6z4q> ${groupedSections.courses.map((course) => renderTemplate`<div class="achievement-item" data-astro-cid-ruvg6z4q> <div class="achievement-icon" data-astro-cid-ruvg6z4q>🎯</div> <div class="achievement-content" data-astro-cid-ruvg6z4q> <h3 class="achievement-title" data-astro-cid-ruvg6z4q>${course.title}</h3> ${course.subtitle && renderTemplate`<p class="achievement-subtitle" data-astro-cid-ruvg6z4q>${course.subtitle}</p>`} <div class="achievement-description" data-astro-cid-ruvg6z4q>${unescapeHTML(course.description)}</div> </div> </div>`)} </div>`} </div> <div class="card-hover-overlay" data-astro-cid-ruvg6z4q> <span class="view-details-text" data-astro-cid-ruvg6z4q>View Details →</span> </div> </div> <!-- Education Card --> <div class="dashboard-card" data-card="education" id="Education" data-astro-cid-ruvg6z4q> <div class="card-header clickable-header" data-astro-cid-ruvg6z4q> <div class="header-content" data-astro-cid-ruvg6z4q> <span class="card-icon" data-astro-cid-ruvg6z4q>🎓</span> <h2 class="card-title" data-astro-cid-ruvg6z4q>Education</h2> </div> <button class="collapse-toggle" aria-label="Toggle section" data-astro-cid-ruvg6z4q>+</button> </div> <div class="card-divider" data-astro-cid-ruvg6z4q></div> <div class="card-content" data-astro-cid-ruvg6z4q> ${groupedSections.education && groupedSections.education.length > 0 && renderTemplate`<div class="education-list" data-astro-cid-ruvg6z4q> ${groupedSections.education.map((edu) => renderTemplate`<div class="education-item" data-astro-cid-ruvg6z4q> <h3 class="education-degree" data-astro-cid-ruvg6z4q>${edu.title}</h3> <p class="education-school" data-astro-cid-ruvg6z4q>${edu.subtitle}</p> <p class="education-dates" data-astro-cid-ruvg6z4q>${edu.date_range}</p> <div class="education-description" data-astro-cid-ruvg6z4q>${unescapeHTML(edu.description)}</div> </div>`)} </div>`} </div> <div class="card-hover-overlay" data-astro-cid-ruvg6z4q> <span class="view-details-text" data-astro-cid-ruvg6z4q>View Details →</span> </div> </div> </div>  <div id="resume-modal" class="resume-modal" data-astro-cid-ruvg6z4q> <div class="resume-modal-content" data-astro-cid-ruvg6z4q> <button class="modal-close" aria-label="Close modal" data-astro-cid-ruvg6z4q>&times;</button> <div class="modal-header" data-astro-cid-ruvg6z4q> <span class="modal-icon" data-astro-cid-ruvg6z4q></span> <h2 class="modal-title" data-astro-cid-ruvg6z4q></h2> </div> <div class="modal-body" data-astro-cid-ruvg6z4q> <!-- Content will be dynamically inserted here --> </div> </div> </div> ` })}`} </div> ${renderScript($$result2, "/home/davmosk/projects/my-resume/src/pages/resume.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
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
