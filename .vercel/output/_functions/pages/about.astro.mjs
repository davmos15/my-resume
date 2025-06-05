import { c as createComponent, g as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1lm3gvy.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DB5JEVk1.mjs';
import { d as db } from '../chunks/db-init_BmxtR14B.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  function getPageContent(pageName) {
    const sections = db.prepare(
      "SELECT section_name, content FROM page_content WHERE page_name = ?"
    ).all(pageName);
    const content2 = {};
    sections.forEach((section) => {
      content2[section.section_name] = section.content;
    });
    return content2;
  }
  let content = {};
  try {
    content = getPageContent("about");
  } catch (error) {
    console.error("About page error:", error);
    content = {};
  }
  const bio = content.bio || "I'm Nadav Moskow, I work in IT Operations and am currently working on migrating our support team from Zendesk to Salesforce Service cloud. If you want to learn more about my experience and other projects I've worked on you can click through to see my resume.";
  const hobbies = content.hobbies || "In my spare time, I love playing cricket, running (come find me at the next marathon), watching movies or sports or analysing some obscure stats (especially if they relate to movies, running or sport).";
  const tagline = content.tagline || "I'm always up for a chat (or a run)!";
  const quote = content.quote || `"I'm the type of person that if you ask me a question and I don't know the answer, I'm gonna tell you that I don't know. But I bet you what, I know how to find the answer and I will find the answer."`;
  const quoteAuthor = content.quote_author || "Chris Gardner - Pursuit of Happyness";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About - Nadav Moskow" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="about-page" class="about"> <img id="picture" src="/images/IMG_7191.jpg" alt="Picture of Nadav"> <p>${bio}</p> <p>${hobbies}</p> <p>${tagline}</p> <p>Get in touch via the <a href="/contact">contact page</a></p> <p> ${quote}<br> <strong>${quoteAuthor}</strong> </p> </div> <hr> ` })}`;
}, "/home/davmosk/projects/my-resume/src/pages/about.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
