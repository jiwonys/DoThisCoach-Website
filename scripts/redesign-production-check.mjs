import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const root = resolve(import.meta.dirname, "..");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4174";
const sports = {
  general: { route: "/app/", source: "app/index.html", ppid: "654f8be5-8f71-488b-88f5-9a1dd46b487b", line: "Your game still matters.", accent: "#2ee68b" },
  soccer: { route: "/app/soccer/", source: "app/soccer/index.html", ppid: "18dd4e91-caeb-4a72-b729-1b0ee698831d", line: "Another sprint.", accent: "#43d990" },
  basketball: { route: "/app/basketball/", source: "app/basketball/index.html", ppid: "cdf59172-8f34-4ab9-9fa3-ef33a5fc403f", line: "Another possession.", accent: "#f3a33b" },
  pickleball: { route: "/app/pickleball/", source: "app/pickleball/index.html", ppid: "241f0bc6-b245-475f-a6b9-3fcf3fd96fcf", line: "Your feet remember.", accent: "#c9ec52" },
  tennis: { route: "/app/tennis/", source: "app/tennis/index.html", ppid: "4c8635a3-522a-41ba-a3d0-214bca0320c5", line: "Another set.", accent: "#c8ef53" },
  volleyball: { route: "/app/volleyball/", source: "app/volleyball/index.html", ppid: "bf00e022-ab60-403e-bc06-a2d3dbdde491", line: "Jump again.", accent: "#49d8c4" },
};
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let checks = 0;

for (const [sport, expected] of Object.entries(sports)) {
  const source = await readFile(resolve(root, expected.source), "utf8");
  assert(source.includes("6771322181"), `${sport}: redirect app ID changed`);
  assert(source.includes(expected.ppid), `${sport}: redirect ppid changed`);
  assert(source.includes("location.replace"), `${sport}: JavaScript redirect missing`);
  assert(source.includes("http-equiv=\"refresh\"") || source.includes("http-equiv='refresh'") || source.includes("http-equiv=refresh"), `${sport}: meta-refresh fallback missing`);
  checks += 4;
}

const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    const failedRequests = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`); });

    for (const [sport, expected] of Object.entries(sports)) {
      await page.goto(`${baseUrl}/?sport=${sport}`, { waitUntil: "networkidle" });
      assert(await page.locator("h1").isVisible(), `${viewport.width}px ${sport}: hero missing`);
      assert(await page.locator(`[data-sport-option="${sport}"]`).getAttribute("aria-pressed") === "true", `${viewport.width}px ${sport}: selected state missing`);
      assert(await page.locator("[data-sport-line]").textContent() === expected.line, `${viewport.width}px ${sport}: emotional line mismatch`);

      const portraitSource = await page.locator("[data-sport-image]").evaluate((image) => image.currentSrc || image.src);
      const expectedPortrait = viewport.width <= 760 ? `/assets/awakening/mobile/${sport}.webp` : `/assets/awakening/${sport}.webp`;
      assert(portraitSource.includes(expectedPortrait), `${viewport.width}px ${sport}: wrong portrait ${portraitSource}`);
      const accent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--sport-accent").trim());
      assert(accent.toLowerCase() === expected.accent, `${viewport.width}px ${sport}: accent mismatch ${accent}`);

      const actions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
      assert(actions.length === 3, `${viewport.width}px ${sport}: expected 3 App Store actions`);
      assert(actions.every((path) => path === expected.route), `${viewport.width}px ${sport}: wrong CTA paths ${actions.join(", ")}`);

      await page.waitForFunction(() => [...document.images].every((image) => image.complete));
      const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => image.naturalWidth === 0).map((image) => image.src));
      assert(broken.length === 0, `${viewport.width}px ${sport}: broken images ${broken.join(", ")}`);

      const geometry = await page.evaluate(() => ({
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
        header: document.querySelector(".site-header").getBoundingClientRect().toJSON(),
        hero: document.querySelector(".hero").getBoundingClientRect().toJSON(),
        headline: document.querySelector(".hero h1").getBoundingClientRect().toJSON(),
        heroCta: document.querySelector(".hero .primary-action").getBoundingClientRect().toJSON(),
        headerCta: document.querySelector(".header-action").getBoundingClientRect().toJSON(),
        controls: [...document.querySelectorAll("[data-sport-option]")].map((element) => element.getBoundingClientRect().toJSON()),
        screen: document.querySelector(".proof-screen").getBoundingClientRect().toJSON(),
      }));
      assert(geometry.horizontalOverflow <= 1, `${viewport.width}px ${sport}: horizontal overflow ${geometry.horizontalOverflow}px`);
      assert(geometry.header.top === 0, `${viewport.width}px ${sport}: header displaced`);
      assert(geometry.hero.top === 0 && geometry.hero.height >= viewport.height - 1, `${viewport.width}px ${sport}: hero viewport mismatch`);
      assert(geometry.controls.every((box) => box.width >= 44 && box.height >= 44), `${viewport.width}px ${sport}: undersized selector control`);
      assert(geometry.headline.left >= 0 && geometry.headline.right <= viewport.width, `${viewport.width}px ${sport}: clipped headline`);
      if (viewport.width <= 390) {
        assert(geometry.controls.every((box) => box.top >= 0 && box.right <= viewport.width && box.bottom <= viewport.height && box.left >= 0), `${viewport.width}px ${sport}: selector outside first viewport`);
        assert(geometry.heroCta.bottom <= viewport.height - 10, `${viewport.width}px ${sport}: hero CTA lacks bottom clearance`);
        assert(geometry.headerCta.width <= 120, `${viewport.width}px ${sport}: header CTA too wide ${geometry.headerCta.width}px`);
        assert(geometry.screen.width >= 224 && geometry.screen.width <= 243, `${viewport.width}px ${sport}: product screen width ${geometry.screen.width}px`);
      }
      checks += viewport.width <= 390 ? 17 : 14;
    }

    await page.goto(`${baseUrl}/?sport=unknown`, { waitUntil: "networkidle" });
    assert(await page.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: invalid fallback failed`);

    await page.goto(`${baseUrl}/?sport=tennis&utm_source=test&private=value`, { waitUntil: "networkidle" });
    const fixedActions = await page.locator("[data-sport-action]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert(fixedActions.every((href) => href === "app/tennis/"), `${viewport.width}px: arbitrary query forwarded`);

    await page.locator('[data-sport-option="tennis"]').focus();
    const beforeScroll = await page.evaluate(() => scrollY);
    await page.keyboard.press("ArrowLeft");
    await page.waitForFunction(() => document.querySelector('[data-sport-option="pickleball"]')?.getAttribute("aria-pressed") === "true");
    assert(new URL(page.url()).searchParams.get("sport") === "pickleball", `${viewport.width}px: keyboard URL failed`);
    assert(Math.abs((await page.evaluate(() => scrollY)) - beforeScroll) < 4, `${viewport.width}px: selector changed scroll position`);

    await page.keyboard.press("Home");
    await page.waitForFunction(() => document.querySelector('[data-sport-option="general"]')?.getAttribute("aria-pressed") === "true");
    await page.keyboard.press("End");
    await page.waitForFunction(() => document.querySelector('[data-sport-option="volleyball"]')?.getAttribute("aria-pressed") === "true");

    await page.locator('[data-sport-option="soccer"]').click();
    await page.locator('[data-sport-option="basketball"]').click();
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => document.querySelector('[data-sport-option="soccer"]')?.getAttribute("aria-pressed") === "true");
    assert(new URL(page.url()).searchParams.get("sport") === "soccer", `${viewport.width}px: browser history failed`);

    for (const selector of ["#method", "#inside", ".closing"]) assert(await page.locator(selector).isVisible(), `${viewport.width}px: missing section ${selector}`);
    for (const fragment of ["#features", "#free-preview"]) {
      await page.goto(`${baseUrl}/${fragment}`, { waitUntil: "networkidle" });
      assert(await page.locator(fragment).count() === 1, `${viewport.width}px: legacy fragment missing ${fragment}`);
      assert(await page.locator(fragment).isVisible(), `${viewport.width}px: legacy fragment not visible ${fragment}`);
    }
    const footerLinks = await page.locator("footer a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const required of ["articles/", "compare/", "support.html", "privacy.html", "terms.html"]) assert(footerLinks.includes(required), `${viewport.width}px: footer missing ${required}`);

    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    assert(focus.outline !== "none" && focus.width >= 2, `${viewport.width}px: visible focus missing`);

    const axe = await new AxeBuilder({ page }).analyze();
    const severe = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    assert(severe.length === 0, `${viewport.width}px: axe violations ${severe.map((violation) => violation.id).join(", ")}`);
    assert(errors.length === 0, `${viewport.width}px: console errors ${errors.join(" | ")}`);
    assert(failedRequests.length === 0, `${viewport.width}px: failed requests ${failedRequests.join(" | ")}`);
    checks += 25;
    await context.close();
  }

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${baseUrl}/`, { waitUntil: "load" });
  assert(await noJsPage.locator("h1").isVisible(), "no-JS hero missing");
  assert(await noJsPage.locator('[data-sport-option="general"]').getAttribute("aria-pressed") === "true", "no-JS selector fallback missing");
  assert((await noJsPage.locator("[data-sport-action]").first().getAttribute("href")) === "app/", "no-JS CTA fallback missing");
  assert(await noJsPage.locator("[data-sport-image]").isVisible(), "no-JS portrait missing");
  assert(await noJsPage.locator(".proof-screen img").isVisible(), "no-JS product proof missing");
  checks += 5;
  await noJsContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  assert(await reducedPage.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion media query failed");
  assert(await reducedPage.locator(".signal-sweep").evaluate((element) => getComputedStyle(element).display === "none"), "reduced-motion sweep still visible");
  checks += 2;
  await reducedContext.close();

  console.log(`PASS athlete signal split: ${checks} assertions`);
} finally {
  await browser.close();
}
