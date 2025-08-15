import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.submit = page.locator('button[type="submit"]');
    this.error = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
  }

  async goto() {
    await this.page.goto('/');
    // Ensure login form present
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  async login(user: { username: string; password: string }) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.submit.click();
  }

  async assertErrorVisible() {
    await expect(this.error).toBeVisible();
    expect(await this.error.textContent()).toBe("Invalid credentials")
  }
}
