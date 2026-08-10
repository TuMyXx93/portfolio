import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home renders and main navigation is visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle(/TumiDev/i);
  await expect(
    page.getByRole('navigation', { name: /navegación principal/i })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /ir a sección/i }).first()
  ).toBeVisible();
});

test('metadata assets resolve for social sharing', async ({
  page,
  request,
}) => {
  const homeResponse = await request.get('/');
  const csp = homeResponse.headers()['content-security-policy'];
  expect(csp).toContain(
    "img-src 'self' blob: data: https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev"
  );
  expect(csp).toContain(
    "connect-src 'self' https://vitals.vercel-insights.com"
  );

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /tumidev\.com\/?$/
  );

  const imageResponse = await request.get('/opengraph-image');
  expect(imageResponse.ok()).toBeTruthy();
  expect(imageResponse.headers()['content-type']).toContain('image/png');

  const manifestResponse = await request.get('/manifest.json');
  expect(manifestResponse.ok()).toBeTruthy();
  const manifest = await manifestResponse.json();
  expect(manifest.icons).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ src: '/images/logo.png' }),
    ])
  );
});

test('home has no critical accessibility violations', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(
    () =>
      !navigator.serviceWorker?.installing && !navigator.serviceWorker?.waiting
  );
  await page.waitForTimeout(1000);
  let results;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      results = await new AxeBuilder({ page }).analyze();
      break;
    } catch (error) {
      if (
        attempt === 1 ||
        !(error instanceof Error) ||
        !error.message.includes('Execution context was destroyed')
      ) {
        throw error;
      }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);
    }
  }

  if (!results) throw new Error('Accessibility analysis did not complete.');
  const blockingViolations = results.violations.filter(
    violation =>
      violation.impact === 'critical' || violation.impact === 'serious'
  );

  expect(blockingViolations).toEqual([]);
});

test('contact API health endpoint responds correctly', async ({ request }) => {
  const response = await request.get('/api/contact');

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.message).toContain('Contact API endpoint is working');
});

test('contact API rejects invalid payload', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: '',
    },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toContain('Validation failed');
});

test('contact POST is not intercepted by the service worker', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'Service worker coverage runs on Chromium; API coverage runs on all browsers.'
  );
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() =>
    Boolean(navigator.serviceWorker?.controller)
  );

  let status: number | undefined;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      status = await page.evaluate(async () => {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: '',
            email: 'bad',
            subject: '',
            message: '',
          }),
        });
        return response.status;
      });
      break;
    } catch (error) {
      if (
        attempt === 1 ||
        !(error instanceof Error) ||
        !error.message.includes('Execution context was destroyed')
      ) {
        throw error;
      }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForFunction(() =>
        Boolean(navigator.serviceWorker?.controller)
      );
    }
  }

  expect(status).toBe(400);
});
