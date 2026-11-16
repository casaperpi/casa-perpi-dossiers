import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { strict as assert } from 'node:assert';

const target = process.env.TARGET_URL;
assert(target, 'TARGET_URL environment variable is required');
mkdirSync('qa/artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [];
async function check(label, fn) {
  try { await fn(); checks.push({ label, status: 'PASS' }); console.log('PASS', label); }
  catch (e) { checks.push({ label, status: 'FAIL', detail: e.message }); console.error('FAIL', label, e.message); }
}
for (const { name, width, height } of [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 }
]) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', e => consoleErrors.push(e.message));
  await check(name + ': page responds', async () => {
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 25000 });
    assert(response?.ok(), 'HTTP ' + response?.status());
  });
  await page.screenshot({ path: 'qa/artifacts/' + name + '.png', fullPage: true, animations: 'disabled' });
  await check(name + ': no horizontal overflow', async () => {
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({scrollWidth: document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
    assert(scrollWidth <= innerWidth + 1, 'scrollWidth=' + scrollWidth + ' viewport=' + innerWidth);
  });
  await check(name + ': primary contact leads somewhere', async () => {
    const cta = page.locator('a[href^="mailto:contact@casaperpi.com"], a[href*="/contact"]').first();
    assert((await cta.count()) > 0, 'no contact CTA');
    assert(await cta.isVisible(), 'contact CTA not visible');
  });
  await check(name + ': no uncaught JS errors', async () => {
    assert.equal(consoleErrors.length, 0, consoleErrors.join('\n'));
  });
  if (name === 'mobile') {
    await check('mobile: menu opens and closes', async () => {
      const button = page.locator('.menu-button');
      assert(await button.isVisible(), 'menu button hidden');
      await button.click();
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
      await page.locator('#site-navigation a[href="#services"]').click();
      assert.equal(await button.getAttribute('aria-expanded'), 'false');
    });
  }
  await context.close();
}
await browser.close();
const failures = checks.filter(x => x.status === 'FAIL');
console.log(JSON.stringify({ checkCount: checks.length, failures }, null, 2));
process.exit(failures.length ? 1 : 0);
