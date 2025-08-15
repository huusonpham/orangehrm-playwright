import { test, expect, request } from '@playwright/test';

test.describe('API testing', () => {
  test('can GET a public API @api', async ({ request }) => {
    const res = await request.get(`/web/index.php/dashboard/index`,);
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200)
  });
});
