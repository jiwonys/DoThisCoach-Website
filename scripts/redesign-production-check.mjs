import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = resolve(import.meta.dirname, '..');
const base = process.env.BASE_URL || 'http://127.0.0.1:4186';
const output = process.env.QA_OUTPUT || resolve(root, '.impeccable/review/sport-coach');
await mkdir(output, { recursive: true });
let checks = 0;
const failures = [];
const report = { base, viewports: [], redirects: [], errors: failures };
function check(condition, message) { checks++; if (!condition) failures.push(message); }
const destinations = JSON.parse(await readFile(resolve(root, 'docs/design/app-store-destinations.json'), 'utf8')).destinations;
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  for (const width of [360, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [], failedAssets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failedAssets.push(response.url()); });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    check(await page.locator('h1').count() === 1, `${width}: one primary heading`);
    check(await page.locator('.hero [data-download]').isVisible(), `${width}: hero download visible`);
    check(await page.locator('.week-days li').count() === 7, `${width}: seven example days`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: no page overflow`);
    await page.screenshot({ path: resolve(output, `hero-${width}.png`) });
    for (const destination of destinations) {
      await page.locator(`[data-sport="${destination.id}"]`).click();
      await page.waitForFunction(id => document.querySelector('#sport-image').getAttribute('src') === (id === 'general' ? '/assets/screenshots/progress-trends.webp' : `/assets/sports/${id}-workout.webp`), destination.id);
      check(await page.locator('[data-sport][aria-current="true"]').count() === 1, `${width}/${destination.id}: one selected sport`);
      const targets = await page.locator('[data-download]').evaluateAll(links => links.map(link => ({ path: new URL(link.href).pathname, query: new URL(link.href).search })));
      check(targets.length >= 7 && targets.every(target => target.path === destination.sourceRoute && !target.query), `${width}/${destination.id}: all download routes match`);
      check(await page.locator('#sport-image').evaluate(img => img.complete && img.naturalWidth >= 640), `${width}/${destination.id}: product evidence loaded`);
    }
    await page.reload({ waitUntil: 'networkidle' });
    check(await page.locator('[data-sport="volleyball"]').getAttribute('aria-current') === 'true', `${width}: sport survives reload`);
    await page.locator('[data-sport="tennis"]').click();
    await page.goBack();
    check(await page.locator('[data-sport="volleyball"]').getAttribute('aria-current') === 'true', `${width}: browser back restores sport`);
    for (const dose of ['prep', 'full', 'lighter']) {
      await page.locator(`[data-dose="${dose}"]`).click();
      check(await page.locator('[data-dose][aria-pressed="true"]').count() === 1, `${width}/${dose}: one selected load`);
      check(await page.locator(`[data-dose="${dose}"]`).getAttribute('aria-pressed') === 'true', `${width}/${dose}: correct load`);
      check((await page.locator('.match-day').innerText()).includes('Thu'), `${width}/${dose}: match stays Thursday`);
    }
    for (const feature of ['coach', 'progress', 'food', 'workout']) {
      await page.locator(`[data-feature="${feature}"]`).click();
      await page.waitForFunction(() => !document.querySelector('#feature-image').hasAttribute('aria-busy'));
      check(await page.locator('#feature-panel').getAttribute('aria-labelledby') === `tab-${feature}`, `${width}/${feature}: matching accessible panel`);
      check(await page.locator('#feature-image').evaluate(img => img.complete && img.naturalWidth > 0), `${width}/${feature}: screenshot loaded`);
    }
    await page.locator('#tab-workout').focus();
    await page.keyboard.press('ArrowRight');
    check(await page.locator('#tab-coach').evaluate(el => el === document.activeElement && el.getAttribute('aria-selected') === 'true'), `${width}: keyboard feature selection`);
    await page.keyboard.press('Home');
    check(await page.locator('#tab-workout').evaluate(el => el === document.activeElement), `${width}: Home key`);
    await page.locator('.site-menu summary').click();
    check(await page.locator('.site-menu-links a').count() === 11, `${width}: complete navigation`);
    check(await page.locator('.site-menu-links').isVisible(), `${width}: menu opens`);
    await page.keyboard.press('Escape');
    check(await page.locator('.site-menu').getAttribute('open') === null, `${width}: Escape closes menu`);
    check(await page.locator('.site-menu summary').evaluate(el => el === document.activeElement), `${width}: focus restored`);
    await page.locator('.faq-list summary').first().click();
    check(await page.locator('.faq-list details').first().getAttribute('open') !== null, `${width}: FAQ expands`);
    await page.locator('.faq-list summary').first().click();
    check(await page.locator('.pricing-grid').evaluate(grid => {
      const bounds = grid.getBoundingClientRect();
      return [...grid.children].every(card => { const box = card.getBoundingClientRect(); return box.left >= bounds.left - 1 && box.right <= bounds.right + 1; });
    }), `${width}: pricing cards remain within their grid`);
    const axe = await new AxeBuilder({ page }).analyze();
    check(axe.violations.length === 0, `${width}: axe violations: ${axe.violations.map(item => item.id).join(', ')}`);
    await page.locator('[data-sport="general"]').click();
    await page.waitForFunction(() => !document.querySelector('#sport-image').hasAttribute('aria-busy'));
    await page.evaluate(() => document.activeElement?.blur());
    await page.mouse.move(0, 0);
    if (width === 390 || width === 1440) {
      for (const [name, selector] of [['week', '#how-it-works'], ['sport', '#sports'], ['features', '#inside'], ['story', '#our-story'], ['pricing', '#pricing'], ['closing', '.closing-section']]) {
        await page.locator(selector).screenshot({ path: resolve(output, `${name}-${width}.png`), style: '.site-header { position: static !important; } .skip-link { visibility: hidden !important; }' });
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: resolve(output, `full-${width}.png`), fullPage: true });
    }
    check(errors.length === 0, `${width}: console errors ${errors.join(', ')}`);
    check(failedAssets.length === 0, `${width}: failed assets ${failedAssets.join(', ')}`);
    report.viewports.push({ width, axe: axe.violations, consoleErrors: errors, failedAssets });
    await context.close();
  }
  const page = await browser.newPage();
  await page.goto(base + '/?sport=invalid&private=test');
  check(await page.locator('[data-download]').first().getAttribute('href') === '/app/', 'Invalid sport falls back');
  await page.locator('[data-sport="tennis"]').click();
  check(new URL(page.url()).searchParams.get('private') === 'test', 'Existing page query preserved');
  check(await page.locator('[data-download]').first().getAttribute('href') === '/app/tennis/', 'Arbitrary query not forwarded');
  for (const destination of destinations) {
    const source = await readFile(resolve(root, destination.sourceRoute.slice(1), 'index.html'), 'utf8');
    const target = source.match(/window\.location\.replace\("([^"]+)"\)/)?.[1];
    check(Boolean(target), `${destination.id}: JavaScript redirect exists`);
    check(target && new URL(target).searchParams.get('ppid') === destination.ppid, `${destination.id}: exact custom page identifier`);
    check(target && source.includes(`content="0; url=${target}"`), `${destination.id}: matching meta redirect`);
    check(target && source.includes(`href="${target}"`), `${destination.id}: clickable fallback`);
    const redirectPage = await browser.newPage();
    await redirectPage.route('https://apps.apple.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>App Store redirect target</title>' }));
    await redirectPage.goto(base + destination.sourceRoute);
    await redirectPage.waitForURL('https://apps.apple.com/**');
    check(new URL(redirectPage.url()).searchParams.get('ppid') === destination.ppid, `${destination.id}: executed redirect target`);
    report.redirects.push({ sport: destination.id, target: redirectPage.url() });
    await redirectPage.close();
  }
  for (const path of ['/articles/', '/compare/', '/partner/', '/support.html', '/privacy.html', '/terms.html']) check((await page.request.get(base + path)).ok(), `Preserved page ${path}`);
  for (const id of ['week', 'athlete-week', 'features', 'coach', 'free-preview']) check(await page.locator(`#${id}`).count() === 1, `Legacy fragment #${id}`);
  await page.route('**/coach-memory.webp', route => route.abort());
  await page.locator('[data-feature="coach"]').click();
  await page.waitForFunction(() => document.querySelector('#feature-caption').textContent.startsWith('Screen unavailable'));
  check(await page.locator('#feature-image').evaluate(img => img.complete && img.naturalWidth > 0), 'Failed image keeps last valid screen');
  await page.unroute('**/coach-memory.webp');
  await page.locator('[data-feature="coach"]').click();
  await page.waitForFunction(() => document.querySelector('#feature-caption').textContent.startsWith('Actual app screen'));
  check((await page.locator('#feature-image').getAttribute('src')).includes('coach-memory'), 'Image retry recovers');
  await page.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJS.newPage();
  await fallback.goto(base + '/');
  check(await fallback.locator('.hero h1').isVisible(), 'No-JavaScript content visible');
  check(await fallback.locator('.hero [data-download]').getAttribute('href') === '/app/', 'No-JavaScript download works');
  await fallback.locator('.site-menu summary').click();
  check(await fallback.locator('.site-menu-links').isVisible(), 'No-JavaScript menu works');
  await noJS.close();
  report.checks = checks;
  await writeFile(resolve(output, 'checks.json'), JSON.stringify(report, null, 2));
  console.log(`${failures.length ? 'FAIL' : 'PASS'}: ${checks} checks, ${failures.length} failures. Evidence: ${output}`);
  if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
} finally { await browser.close(); }
