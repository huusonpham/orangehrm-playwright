import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly searchInput: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('.oxd-userdropdown');
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.searchResults = page.locator('.oxd-main-menu .oxd-main-menu-item-wrapper');
  }

  async assertLoaded() {
    await expect(this.userDropdown).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /dashboard/i })).toBeVisible({ timeout: 10_000 });
  }

  async globalSearch(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
  }

  async selectFirstResult() {
    const items = this.searchResults;
    await expect(items.first()).toBeVisible({ timeout: 5000 });
    await items.first().click();
  }
}
