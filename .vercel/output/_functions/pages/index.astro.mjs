import { c as createComponent, g as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1lm3gvy.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DB5JEVk1.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const content = {
    hero_title: "Hi, I'm Nadav!",
    hero_subtitle: "I'm an Application Administrator currently working at Foxit Software."
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Nadav Moskow - Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="welcome-section" class="intro"> <div id="homepage-text"> <h1>${content.hero_title}</h1> <p>${content.hero_subtitle}</p> <p>You can read <a href="/resume">my resume</a> or find out more about me by visiting the <a href="/about">about me page</a>.</p> <p>This website is intentionally a work in progress, I created it to work on some of my skills, there will be more to come in time.</p> <p>If you'd like to get in touch, don't hesitate to <a href="/contact">contact me</a>.</p> </div> </div> ` })}`;
}, "/home/davmosk/projects/my-resume/src/pages/index.astro", void 0);

const $$file = "/home/davmosk/projects/my-resume/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
