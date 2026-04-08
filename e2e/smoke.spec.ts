import { expect, test } from '@playwright/test';

test('home renders and main navigation is visible', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/TumiDev/i);
  await expect(
    page.getByRole('navigation', { name: /navegación principal/i })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /ir a sección/i }).first()
  ).toBeVisible();
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
  expect(body.error).toContain('All fields are required');
});
