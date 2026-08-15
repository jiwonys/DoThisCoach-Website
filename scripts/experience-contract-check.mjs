import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const index = read("index.html");
const css = read("experience-src/experience.css");
const main = read("experience-src/main.jsx");
const motion = read("experience-src/motion/initMotion.js");
const shader = read("experience-src/shaders/tensionMaterial.js");
const workflow = read(".github/workflows/pages.yml");

assert.match(index, /<h1[^>]*>[\s\S]*Unleash your[\s\S]*inner athlete\./);
assert.match(index, /https:\/\/apps\.apple\.com\/us\/app\/dothis-ai-fitness-coach\/id6771322181/);
assert.match(index, /Seven days of Premium\. No payment\. No automatic charge\./);
assert.match(index, /does not renew or charge automatically/);
assert.match(index, /not medical advice, diagnosis, or treatment/i);

for (const id of ["features", "free-preview", "how-it-works", "pricing", "partners"]) {
  assert.match(index, new RegExp(`id=["']${id}["']`), `Legacy anchor #${id} must remain available.`);
}

for (const system of ["today", "workout", "food", "coach", "goals", "progress"]) {
  assert.match(index, new RegExp(`data-system=["']${system}["']`));
  assert.match(index, new RegExp(`data-system-screen=["']${system}["']`));
}

assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.match(css, /\.experience-fallback::before[\s\S]*today-plan\.webp/);
assert.match(main, /IntersectionObserver/);
assert.match(main, /requestIdleCallback/);
assert.match(motion, /new Lenis/);
assert.match(motion, /ScrollTrigger\.create/);
assert.match(motion, /dothis:cta/);
assert.match(shader, /uAdaptation/);
assert.match(shader, /uScrollVelocity/);
assert.match(shader, /float weave/);

assert.equal(existsSync("concept-a/index.html"), false, "Prototype route concept-a must not ship.");
assert.equal(existsSync("concept-b/index.html"), false, "Prototype route concept-b must not ship.");
assert.equal(existsSync("concept-c/index.html"), false, "Prototype route concept-c must not ship.");
assert.equal(existsSync("prototype-src/shared/PrototypeApp.jsx"), false, "Prototype implementation must not pollute production source.");

assert.match(workflow, /npm ci/);
assert.match(workflow, /npm run build:site/);
assert.match(workflow, /npm run check:dist/);
assert.match(workflow, /path:\s*dist/);

for (const document of [
  "docs/site-audit.md",
  "docs/creative-directions.md",
  "docs/hero-storyboards.md",
  "docs/prototype-visual-qa.md",
  "docs/design-decision.md",
  "docs/animation-ownership.md",
  "docs/performance-budget.md",
  "docs/asset-licenses.md",
  "docs/experience-architecture.md",
  "docs/production-visual-qa.md",
]) {
  assert.equal(existsSync(document), true, `${document} is required.`);
}

console.log("Immersive experience contract check passed.");
