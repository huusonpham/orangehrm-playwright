import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { creds } from '../../src/utils/testData';

test.describe('Login', () => {
  test('valid login redirects to Dashboard @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(creds);
    await dashboard.assertLoaded();
    await expect(page).toHaveURL(/dashboard/i);
  });

  test('invalid password shows error and stays on login @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login({ username: creds.username, password: 'WrongPass123!' });
    await login.assertErrorVisible();
    await expect(page).toHaveURL(/auth\/login|\/$/i);
  });

  test('trims spaces around username and stays on login @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login({ username: '  ' + creds.username, password: creds.password });
    await login.assertErrorVisible();
    await expect(page).toHaveURL(/auth\/login|\/$/i);
  });
});
