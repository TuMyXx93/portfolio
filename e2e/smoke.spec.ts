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

test('home has no critical accessibility violations', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const results = await new AxeBuilder({ page }).analyze();
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

  const status = await page.evaluate(async () => {
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

  expect(status).toBe(400);
});
