import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from '@playwright/test';

const root = resolve(import.meta.dirname, '..');
const base = process.env.BASE_URL || 'http://127.0.0.1:4325';
const source = await readFile(resolve(root, 'scripts/beyond-court-browser-check.js'), 'utf8');
// The same trusted local assertions run both in playwright-cli and through npm.
const run = new Function(`return (${source})`)();
const browser = await chromium.launch();
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const result = await run(page, base);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
