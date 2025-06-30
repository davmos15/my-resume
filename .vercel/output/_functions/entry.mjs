import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CL_vLPWZ.mjs';
import { manifest } from './manifest_L3bVzrbp.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin/projects.astro.mjs');
const _page5 = () => import('./pages/admin/resume.astro.mjs');
const _page6 = () => import('./pages/api/admin/stats.astro.mjs');
const _page7 = () => import('./pages/api/auth/login.astro.mjs');
const _page8 = () => import('./pages/api/auth/logout.astro.mjs');
const _page9 = () => import('./pages/api/contact.astro.mjs');
const _page10 = () => import('./pages/api/health.astro.mjs');
const _page11 = () => import('./pages/api/projects/reorder.astro.mjs');
const _page12 = () => import('./pages/api/projects/_id_.astro.mjs');
const _page13 = () => import('./pages/api/projects.astro.mjs');
const _page14 = () => import('./pages/api/resume/_id_.astro.mjs');
const _page15 = () => import('./pages/api/resume.astro.mjs');
const _page16 = () => import('./pages/contact.astro.mjs');
const _page17 = () => import('./pages/projects.astro.mjs');
const _page18 = () => import('./pages/resume.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/projects.astro", _page4],
    ["src/pages/admin/resume.astro", _page5],
    ["src/pages/api/admin/stats.js", _page6],
    ["src/pages/api/auth/login.js", _page7],
    ["src/pages/api/auth/logout.js", _page8],
    ["src/pages/api/contact.js", _page9],
    ["src/pages/api/health.js", _page10],
    ["src/pages/api/projects/reorder.js", _page11],
    ["src/pages/api/projects/[id].js", _page12],
    ["src/pages/api/projects/index.js", _page13],
    ["src/pages/api/resume/[id].js", _page14],
    ["src/pages/api/resume/index.js", _page15],
    ["src/pages/contact.astro", _page16],
    ["src/pages/projects.astro", _page17],
    ["src/pages/resume.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "e707fcd0-7525-4403-9737-38cf19101835",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
