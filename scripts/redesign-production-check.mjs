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
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });

    for (const [sport, expectedPath] of Object.entries(sports)) {
      await page.goto(`${baseUrl}/?sport=${sport}`, { waitUntil: "networkidle" });
      assert(await page.locator("h1").isVisible(), `${viewport.width}px ${sport}: headline missing`);
      assert(await page.locator(`[data-sport-option="${sport}"]`).getAttribute("aria-pressed") === "true", `${viewport.width}px ${sport}: selected state missing`);
      const selectedVisible = await page.locator(`[data-sport-option="${sport}"]`).evaluate((element) => {
        const item = element.getBoundingClientRect();
        const row = element.parentElement.getBoundingClientRect();
        return item.left >= row.left - 1 && item.right <= row.right + 1;
      });
      assert(selectedVisible, `${viewport.width}px ${sport}: selected control is outside visible selector row`);

      const actions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => ({ path: new URL(link.href).pathname, text: link.textContent.trim() })));
      assert(actions.length === 3, `${viewport.width}px ${sport}: expected 3 App Store actions`);
      assert(actions.every((action) => action.path === expectedPath), `${viewport.width}px ${sport}: wrong CTA ${JSON.stringify(actions)}`);

      const sources = await page.locator("[data-sport-hero], [data-sport-workout]").evaluateAll((images) => images.map((image) => image.currentSrc || image.src));
      assert(sources.every((source) => source.includes(`/assets/sports/${sport}-`)), `${viewport.width}px ${sport}: mismatched sport evidence`);

      await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
      await page.waitForFunction(() => [...document.images].every((image) => image.complete));
      const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
      assert(brokenImages.length === 0, `${viewport.width}px ${sport}: broken images ${brokenImages.join(", ")}`);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert(overflow <= 1, `${viewport.width}px ${sport}: horizontal overflow ${overflow}px`);
      checks += 7;
    }

    await page.goto(`${baseUrl}/?sport=unknown`, { waitUntil: "networkidle" });
    assert(await page.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: invalid sport did not use general fallback`);

    await page.goto(`${baseUrl}/?sport=tennis&utm_source=test&private=value`, { waitUntil: "networkidle" });
    const tennisActions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert(tennisActions.every((href) => href === "app/tennis/"), `${viewport.width}px: arbitrary query forwarded to CTA`);

    await page.locator('[data-sport-option="tennis"]').focus();
    await page.keyboard.press("ArrowLeft");
    await page.waitForFunction(() => document.querySelector('[data-sport-option="pickleball"]')?.getAttribute("aria-pressed") === "true");
    assert(new URL(page.url()).searchParams.get("sport") === "pickleball", `${viewport.width}px: keyboard state missing from URL`);

    await page.locator('[data-sport-option="soccer"]').click();
    await page.waitForFunction(() => document.querySelector('[data-sport-option="soccer"]')?.getAttribute("aria-pressed") === "true");
    await page.locator('[data-sport-option="basketball"]').click();
    await page.waitForFunction(() => document.querySelector('[data-sport-option="basketball"]')?.getAttribute("aria-pressed") === "true");
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => document.querySelector('[data-sport-option="soccer"]')?.getAttribute("aria-pressed") === "true", null, { timeout: 5000 });
    assert(new URL(page.url()).searchParams.get("sport") === "soccer", `${viewport.width}px: browser history did not restore sport`);

    const firstFaq = page.locator("#faq details").first();
    await firstFaq.locator("summary").click();
    assert(await firstFaq.getAttribute("open") !== null, `${viewport.width}px: FAQ did not open`);

    const footerLinks = await page.locator("footer a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const required of ["articles/", "privacy.html", "terms.html", "support.html"]) {
      assert(footerLinks.includes(required), `${viewport.width}px: footer missing ${required}`);
    }

    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    assert(outline.style !== "none" && outline.width >= 2, `${viewport.width}px: visible focus missing`);

    const axe = await new AxeBuilder({ page }).analyze();
    const severe = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    assert(severe.length === 0, `${viewport.width}px: axe serious/critical violations ${severe.map((violation) => violation.id).join(", ")}`);

    if (viewport.width === 768) {
      const menu = page.locator(".menu-button");
      assert(await menu.isVisible(), "768px: navigation menu button missing");
      await menu.click();
      assert(await menu.getAttribute("aria-expanded") === "true", "768px: navigation menu did not open");
      await page.keyboard.press("Escape");
      assert(await menu.getAttribute("aria-expanded") === "false", "768px: Escape did not close navigation");
      checks += 3;
    }

    assert(errors.length === 0, `${viewport.width}px: console errors ${errors.join(" | ")}`);
    assert(failedRequests.length === 0, `${viewport.width}px: failed requests ${failedRequests.join(" | ")}`);
    checks += 12;
    await context.close();
  }

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${baseUrl}/`, { waitUntil: "load" });
  assert(await noJsPage.locator("h1").isVisible(), "no-JS headline missing");
  assert(await noJsPage.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", "no-JS general fallback missing");
  assert((await noJsPage.locator("[data-sport-action]").first().getAttribute("href")) === "app/", "no-JS App Store fallback missing");
  assert(await noJsPage.locator("[data-sport-hero]").isVisible(), "no-JS product evidence missing");
  checks += 4;
  await noJsContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const reduced = await reducedPage.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  assert(reduced, "reduced-motion media query not honored");
  checks += 1;
  await reducedContext.close();

  console.log(`PASS production redesign: ${checks} assertions`);
} finally {
  await browser.close();
}
