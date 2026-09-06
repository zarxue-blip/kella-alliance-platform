import assert from "node:assert/strict";
import { kellaDashboardHtml } from "../src/views/kellaDashboard.js";

const html = kellaDashboardHtml();
const inlineScripts = Array.from(html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))
  .map((match) => match[1]?.trim() || "")
  .filter(Boolean);

assert.ok(inlineScripts.length, "dashboard must contain its inline application script");
for (const script of inlineScripts) new Function(script);

assert.match(html, /data-wiki-canvas/, "Wiki editor must remain in the dashboard");
assert.match(html, /data-buff-day/, "Realm Buff calendar rendering must remain in the dashboard");
assert.match(html, /Poll Participation/, "Attendance must render poll participation");
assert.match(html, /data-action="send-poll"/, "admin poll creator must render");

console.log("Dashboard template syntax and feature checks passed.");
