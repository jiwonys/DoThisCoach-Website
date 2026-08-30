import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4175";
const route = "/prototypes/article-reboot/signal-split.html";
const sports = {
  general: "../../app/",
  soccer: "../../app/soccer/",
  basketball: "../../app/basketball/",
  pickleball: "../../app/pickleball/",
  tennis: "../../app/tennis/",
  volleyball: "../../app/volleyball/",
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

const browser = await chromium.launch({ headless: true });
let checks = 0;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    const failures = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });

    for (const [sport, expectedRoute] of Object.entries(sports)) {
      await page.goto(`${baseUrl}${route}?sport=${sport}`, { waitUntil: "networkidle" });
      assert(await page.locator("h1").isVisible(), `${viewport.width}px ${sport}: headline missing`);
      assert(await page.locator(`[data-sport="${sport}"]`).getAttribute("aria-pressed") === "true", `${viewport.width}px ${sport}: selected state wrong`);
      assert((await page.locator("[data-sport-image]").getAttribute("src")).endsWith(`/assets/awakening/${sport}.webp`), `${viewport.width}px ${sport}: portrait mismatch`);
      assert((await page.locator(".primary-action").getAttribute("href")) === expectedRoute, `${viewport.width}px ${sport}: CTA route mismatch`);

      const geometry = await page.evaluate(() => ({
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
        verticalOverflow: document.documentElement.scrollHeight - innerHeight,
        controls: [...document.querySelectorAll("[data-sport]")].map((element) => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height, top: box.top, right: box.right, bottom: box.bottom, left: box.left };
        }),
        cta: document.querySelector(".primary-action").getBoundingClientRect().toJSON(),
      }));
      assert(geometry.horizontalOverflow <= 1, `${viewport.width}px ${sport}: horizontal overflow ${geometry.horizontalOverflow}px`);
      assert(geometry.verticalOverflow <= 1, `${viewport.width}px ${sport}: vertical overflow ${geometry.verticalOverflow}px`);
      assert(geometry.controls.every((box) => box.width >= 44 && box.height >= 44), `${viewport.width}px ${sport}: undersized sport target`);
      if (viewport.width <= 390) {
        assert(geometry.controls.every((box) => box.top >= 0 && box.right <= viewport.width && box.bottom <= viewport.height && box.left >= 0), `${viewport.width}px ${sport}: sport selector outside viewport`);
        assert(geometry.cta.bottom <= viewport.height - 10, `${viewport.width}px ${sport}: CTA lacks bottom safety margin`);
      }
      checks += 8;
    }

    await page.goto(`${baseUrl}${route}?sport=invalid`, { waitUntil: "networkidle" });
    assert(await page.locator('[data-sport="general"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: invalid fallback failed`);

    await page.locator('[data-sport="tennis"]').focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => document.querySelector('[data-sport="volleyball"]')?.getAttribute("aria-pressed") === "true");
    assert(await page.locator('[data-sport="volleyball"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: keyboard state failed`);
    assert(new URL(page.url()).searchParams.get("sport") === "volleyball", `${viewport.width}px: keyboard URL failed`);

    await page.keyboard.press("Home");
    await page.waitForFunction(() => document.querySelector('[data-sport="general"]')?.getAttribute("aria-pressed") === "true");
    assert(await page.locator('[data-sport="general"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: Home key failed`);
    await page.keyboard.press("End");
    await page.waitForFunction(() => document.querySelector('[data-sport="volleyball"]')?.getAttribute("aria-pressed") === "true");
    assert(await page.locator('[data-sport="volleyball"]').getAttribute("aria-pressed") === "true", `${viewport.width}px: End key failed`);

    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    assert(focus.outline !== "none" && focus.width >= 2, `${viewport.width}px: focus ring missing`);

    const axe = await new AxeBuilder({ page }).analyze();
    const severe = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    assert(severe.length === 0, `${viewport.width}px: axe ${severe.map((item) => item.id).join(", ")}`);
    assert(errors.length === 0, `${viewport.width}px: console errors ${errors.join(" | ")}`);
    assert(failures.length === 0, `${viewport.width}px: network failures ${failures.join(" | ")}`);
    checks += 10;
    await context.close();
  }

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  assert(await noJsPage.locator("h1").isVisible(), "no-JS headline missing");
  assert(await noJsPage.locator('[data-sport="general"]').getAttribute("aria-pressed") === "true", "no-JS General state missing");
  assert((await noJsPage.locator(".primary-action").getAttribute("href")) === "../../app/", "no-JS CTA fallback wrong");
  checks += 3;
  await noJsContext.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  assert(await reducedPage.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion query failed");
  checks += 1;
  await reducedContext.close();

  console.log(`PASS article-reboot prototype: ${checks} assertions`);
} finally {
  await browser.close();
}
