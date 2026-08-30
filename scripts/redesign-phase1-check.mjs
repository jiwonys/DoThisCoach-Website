import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const concepts = ["concept-light", "concept-dark"];
const viewports = [
  { width: 390, height: 844 },
  { width: 1440, height: 1000 }
];
const sports = {
  general: "/app/",
  soccer: "/app/soccer/",
  basketball: "/app/basketball/",
  pickleball: "/app/pickleball/",
  tennis: "/app/tennis/",
  volleyball: "/app/volleyball/"
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });
let checks = 0;

try {
  for (const concept of concepts) {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      for (const [sport, expectedPath] of Object.entries(sports)) {
        await page.goto(`${baseUrl}/prototype-src/redesign/${concept}/?sport=${sport}`, { waitUntil: "networkidle" });
        const pressed = await page.locator(`[data-sport-option="${sport}"]`).getAttribute("aria-pressed");
        assert(pressed === "true", `${concept} ${viewport.width}px ${sport}: selected state missing`);

        const actionPaths = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
        assert(actionPaths.length === 2, `${concept} ${viewport.width}px ${sport}: expected 2 actions`);
        assert(actionPaths.every((path) => path === expectedPath), `${concept} ${viewport.width}px ${sport}: wrong CTA path ${actionPaths.join(", ")}`);

        const sources = await page.locator("[data-sport-hero], [data-sport-workout]").evaluateAll((images) => images.map((image) => image.currentSrc || image.src));
        assert(sources.every((source) => source.includes(`/${sport}-`)), `${concept} ${viewport.width}px ${sport}: mismatched sport imagery`);

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert(overflow <= 1, `${concept} ${viewport.width}px ${sport}: horizontal overflow ${overflow}px`);
        checks += 4;
      }

      await page.goto(`${baseUrl}/prototype-src/redesign/${concept}/?sport=unknown`, { waitUntil: "networkidle" });
      assert(await page.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", `${concept}: invalid sport did not fall back to general`);
      checks += 1;

      await page.goto(`${baseUrl}/prototype-src/redesign/${concept}/?sport=tennis`, { waitUntil: "networkidle" });
      await page.locator('[data-sport-option="tennis"]').focus();
      await page.keyboard.press("ArrowLeft");
      await page.waitForFunction(() => document.querySelector('[data-sport-option="pickleball"]')?.getAttribute("aria-pressed") === "true");
      assert(await page.locator('[data-sport-option="pickleball"]').getAttribute("aria-pressed") === "true", `${concept}: arrow-key selection failed`);
      checks += 1;

      const axe = await new AxeBuilder({ page }).analyze();
      const severe = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
      assert(severe.length === 0, `${concept} ${viewport.width}px: axe serious/critical violations: ${severe.map((violation) => violation.id).join(", ")}`);
      assert(errors.length === 0, `${concept} ${viewport.width}px: console errors: ${errors.join(" | ")}`);
      checks += 2;
      await context.close();
    }

    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await noJs.newPage();
    await page.goto(`${baseUrl}/prototype-src/redesign/${concept}/`, { waitUntil: "load" });
    assert(await page.locator("h1").isVisible(), `${concept}: no-JS headline missing`);
    assert((await page.locator("[data-sport-action]").first().getAttribute("href")) === "/app/tennis/", `${concept}: no-JS CTA fallback missing`);
    assert(await page.locator("[data-sport-hero]").isVisible(), `${concept}: no-JS product evidence missing`);
    checks += 3;
    await noJs.close();
  }

  console.log(`PASS redesign Phase 1: ${checks} assertions`);
} finally {
  await browser.close();
}
