import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4174";
const sports = {
  general: "/app/",
  soccer: "/app/soccer/",
  basketball: "/app/basketball/",
  pickleball: "/app/pickleball/",
  tennis: "/app/tennis/",
  volleyball: "/app/volleyball/"
};
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });
let checks = 0;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    const failedRequests = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`); });

    for (const [sport, expectedPath] of Object.entries(sports)) {
      await page.goto(`${baseUrl}/?sport=${sport}`, { waitUntil: "networkidle" });
      assert(await page.locator("h1").isVisible(), `${viewport.width}px ${sport}: hero missing`);
      assert(await page.locator(`[data-sport-option="${sport}"]`).getAttribute("aria-pressed") === "true", `${viewport.width}px ${sport}: selected state missing`);

      const selectedVisible = await page.locator(`[data-sport-option="${sport}"]`).evaluate((element) => {
        const item = element.getBoundingClientRect();
        const row = element.parentElement.getBoundingClientRect();
        return item.left >= row.left - 1 && item.right <= row.right + 1;
      });
      assert(selectedVisible, `${viewport.width}px ${sport}: selected control outside visible selector`);

      const actions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
      assert(actions.length === 5, `${viewport.width}px ${sport}: expected 5 App Store actions`);
      assert(actions.every((path) => path === expectedPath), `${viewport.width}px ${sport}: wrong CTA paths ${actions.join(", ")}`);

      const portraitSource = await page.locator("[data-sport-image]").evaluate((image) => image.currentSrc || image.src);
      assert(portraitSource.includes(`/assets/awakening/${sport}.webp`), `${viewport.width}px ${sport}: wrong athlete portrait`);

      await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
      await page.waitForFunction(() => [...document.images].every((image) => image.complete));
      const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => image.naturalWidth === 0).map((image) => image.src));
      assert(broken.length === 0, `${viewport.width}px ${sport}: broken images ${broken.join(", ")}`);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert(overflow <= 1, `${viewport.width}px ${sport}: horizontal overflow ${overflow}px`);
      checks += 7;
    }

    await page.goto(`${baseUrl}/?sport=unknown`, { waitUntil: "networkidle" });
    assert(await page.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: invalid sport fallback failed`);

    await page.goto(`${baseUrl}/?sport=tennis&utm_source=test&private=value`, { waitUntil: "networkidle" });
    const fixedActions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert(fixedActions.every((href) => href === "app/tennis/"), `${viewport.width}px: arbitrary query forwarded`);

    await page.locator('[data-sport-option="tennis"]').focus();
    await page.keyboard.press("ArrowLeft");
    await page.waitForFunction(() => document.querySelector('[data-sport-option="pickleball"]')?.getAttribute("aria-pressed") === "true");
    assert(new URL(page.url()).searchParams.get("sport") === "pickleball", `${viewport.width}px: keyboard URL state failed`);

    await page.locator('[data-sport-option="soccer"]').click();
    await page.waitForFunction(() => document.querySelector('[data-sport-option="soccer"]')?.getAttribute("aria-pressed") === "true");
    await page.locator('[data-sport-option="basketball"]').click();
    await page.waitForFunction(() => document.querySelector('[data-sport-option="basketball"]')?.getAttribute("aria-pressed") === "true");
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => document.querySelector('[data-sport-option="soccer"]')?.getAttribute("aria-pressed") === "true", null, { timeout: 5000 });
    assert(new URL(page.url()).searchParams.get("sport") === "soccer", `${viewport.width}px: browser history failed`);

    for (const selector of ["#awakening", "#your-sport", "#inside", ".final-awakening"]) {
      assert(await page.locator(selector).isVisible(), `${viewport.width}px: missing narrative section ${selector}`);
    }

    const footerLinks = await page.locator("footer a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const required of ["articles/", "privacy.html", "terms.html", "support.html"]) assert(footerLinks.includes(required), `${viewport.width}px: footer missing ${required}`);

    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    assert(outline.style !== "none" && outline.width >= 2, `${viewport.width}px: visible focus missing`);

    const axe = await new AxeBuilder({ page }).analyze();
    const severe = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    assert(severe.length === 0, `${viewport.width}px: axe violations ${severe.map((violation) => violation.id).join(", ")}`);
    assert(errors.length === 0, `${viewport.width}px: console errors ${errors.join(" | ")}`);
    assert(failedRequests.length === 0, `${viewport.width}px: failed requests ${failedRequests.join(" | ")}`);
    checks += 14;
    await context.close();
  }

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${baseUrl}/`, { waitUntil: "load" });
  assert(await noJsPage.locator("h1").isVisible(), "no-JS hero missing");
  assert(await noJsPage.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", "no-JS selector fallback missing");
  assert((await noJsPage.locator("[data-sport-action]").first().getAttribute("href")) === "app/", "no-JS CTA fallback missing");
  assert(await noJsPage.locator("[data-sport-image]").isVisible(), "no-JS athlete portrait missing");
  checks += 4;
  await noJsContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  assert(await reducedPage.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion media query failed");
  checks += 1;
  await reducedContext.close();

  console.log(`PASS second awakening: ${checks} assertions`);
} finally {
  await browser.close();
}
