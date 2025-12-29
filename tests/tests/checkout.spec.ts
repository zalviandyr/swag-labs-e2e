import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import {
  baseUrl,
  completeCheckoutUrl,
  inventoryUrl,
  stepOneUrl,
  stepTwoUrl,
  users,
} from "../helpers/constants";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutPage } from "../pages/checkout.page";

test.describe("Manage Item in Cart", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = users.standard;
    await loginPage.login(user);
  });

  test("can add item into cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Action
    await inventoryPage.addBtn.click();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();

    // Assertions
    const count = await checkoutPage.inventoryItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test("can remove item from cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Action
    await inventoryPage.addBtn.click();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();

    const count = await checkoutPage.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      await checkoutPage.getRemoveBtnByIndex(i).click();
    }

    // Assertions
    const afterCount = await checkoutPage.inventoryItems.count();
    expect(afterCount).toBe(0);
  });
});

test.describe("Checkout", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = users.standard;
    await loginPage.login(user);
  });

  test("can be checkout the item", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Action
    await inventoryPage.addBtn.click();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.checkoutBtn.click();

    // Assertions
    await expect(page).toHaveURL(stepOneUrl);

    // Action
    await checkoutPage.fillForm({
      firstName: "Zukron",
      lastName: "Alviandy",
      postal: 9999,
    });
    await checkoutPage.continueBtn.click();

    // Assertions
    await expect(page).toHaveURL(stepTwoUrl);
    await expect(checkoutPage.paymentLabel).toBeVisible();
    await expect(checkoutPage.paymentValue).toBeVisible();
    await expect(checkoutPage.shippingLabel).toBeVisible();
    await expect(checkoutPage.shippingValue).toBeVisible();
    await expect(checkoutPage.subtotalLabel).toBeVisible();
    await expect(checkoutPage.totalLabel).toBeVisible();

    // Action
    await checkoutPage.finishBtn.click();

    // Assertions
    await expect(page).toHaveURL(completeCheckoutUrl);
    await expect(checkoutPage.completeContainer).toBeVisible();

    // Action
    await checkoutPage.backHomeBtn.click();

    // Assertions
    await expect(page).toHaveURL(inventoryUrl);
  });
});
