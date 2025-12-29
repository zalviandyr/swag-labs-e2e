import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { inventoryUrl, users } from "../helpers/constants";

test.describe("Successful login user", () => {
  const validUsers = [
    users.standard,
    users.problem,
    users.performance_glitch,
    users.error,
    users.visual,
  ];

  for (const user of validUsers) {
    test(`can login as ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      // Action
      await loginPage.login(user);

      // Assertions
      await expect(page).toHaveURL(inventoryUrl);
    });
  }
});

test.describe("Failed login user", () => {
  test("locked out user cannot login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Action
    const user = users.locked_out;
    await loginPage.login(user);

    // Assertions
    await expect(loginPage.errorBox).toBeVisible();
    await expect(loginPage.errorBox).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
