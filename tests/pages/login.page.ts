import { type Locator, type Page } from "@playwright/test";
import { baseUrl } from "../helpers/constants";
import { User } from "../types/user";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorBox = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(baseUrl);
  }

  async login(user: User) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);

    await this.loginBtn.click();
  }
}
