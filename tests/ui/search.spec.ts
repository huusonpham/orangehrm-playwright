import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { creds, queries } from '../../src/utils/testData';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(creds);
  const dashboard = new DashboardPage(page);
  await dashboard.assertLoaded();
});

test('global menu search navigates to target module @smoke', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.globalSearch(queries.menuSearch);
  await dashboard.selectFirstResult();
  await expect(page).not.toHaveURL(/dashboard/i);
});

test('global search shows no suggestions for nonsense @regression', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.globalSearch(queries.nonsense);
  await expect(dashboard.searchResults.first()).toBeHidden({ timeout: 3000 });
});