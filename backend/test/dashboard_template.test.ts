import assert from "node:assert/strict";
import { kellaDashboardHtml } from "../src/views/kellaDashboard.js";

const html = kellaDashboardHtml();
const inlineScripts = Array.from(html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))
  .map((match) => match[1]?.trim() || "")
  .filter(Boolean);

assert.ok(inlineScripts.length, "dashboard must contain its inline application script");
for (const script of inlineScripts) new Function(script);

assert.match(html, /data-wiki-canvas/, "Wiki editor must remain in the dashboard");
assert.doesNotMatch(html, /path: "\/buff-schedule"|path: "\/roots-of-war"/, "retired navigation must be absent");
assert.match(html, /migration-gold.png/, "Migration navigation icon must be present");
assert.doesNotMatch(html, /data-buff-day|realmBuff|renderRoots/, "Removed realm buff and Roots features must not remain in the application script");
assert.match(html, /Poll Participation/, "Attendance must render poll participation");
assert.match(html, /data-action="send-poll"/, "admin poll creator must render");

console.log("Dashboard template syntax and feature checks passed.");
