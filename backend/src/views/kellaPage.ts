import { createHash } from 'node:crypto';
import { kellaDashboardHtml } from './kellaDashboard.js';

// The production template is static. Build it once and let the browser cache
// the application and styles across document navigation, rather than repeat
// nearly 700 KB of inline source on every response.
const assets = new Map<string, {type:string;body:string}>();
function asset(body:string, extension:string):string {
  const hash = createHash('sha256').update(body).digest('hex').slice(0,16);
  const path = `/assets/kella-${hash}.${extension}`;
  assets.set(path,{type:extension === 'js' ? 'application/javascript' : 'text/css',body});
  return path;
}
// Extract scripts first so style strings inside page renderers stay in JavaScript.
export const kellaPageHtml = kellaDashboardHtml()
  .replace(/<script>([\s\S]*?)<\/script>/g,(_match,js:string)=>`<script src="${asset(js,'js')}"></script>`)
  .replace(/<style>([\s\S]*?)<\/style>/g,(_match,css:string)=>`<link rel="stylesheet" href="${asset(css,'css')}" />`);
export const kellaPageAssets = assets;
