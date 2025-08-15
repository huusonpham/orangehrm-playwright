import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly submitButton: Locator;
  readonly errorLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextbox = page.locator('input[name="username"]');
    this.passwordTextbox = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorLabel = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.usernameTextbox).toBeVisible();
    await expect(this.passwordTextbox).toBeVisible();
  }

  async login(user: { username: string; password: string }) {
    await this.usernameTextbox.fill(user.username);
    await this.passwordTextbox.fill(user.password);
    await this.submitButton.click();
  }

  async assertErrorVisible() {
    await expect(this.errorLabel).toBeVisible();
    expect(await this.errorLabel.textContent()).toBe("Invalid credentials")
  }
}
