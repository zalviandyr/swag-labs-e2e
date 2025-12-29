import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { users } from "../helpers/constants";
import { InventoryPage } from "../pages/inventory.page";

test.describe("Inventory List", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = users.standard;
    await loginPage.login(user);
  });

  test("should show inventory list", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Assertions
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test("can add item to cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Action
    await inventoryPage.addBtn.click();

    // Assertions
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("can remove item from cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Action and Assertion
    await inventoryPage.addBtn.click();
    await expect(inventoryPage.cartBadge).toBeVisible();

    // Action and Assertion
    await inventoryPage.removeBtn.click();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});

test.describe("Inventory Detail", () => {
  const indicesToTest = [0, 2, 5];

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = users.standard;
    await loginPage.login(user);
  });

  for (const index of indicesToTest) {
    test(`item at index ${index} matches detail`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.goto();

      const name = await inventoryPage.getItemNameByIndex(index).textContent();
      const desc = await inventoryPage.getItemDescByIndex(index).textContent();
      const price = await inventoryPage.getItemPriceByIndex(index).textContent();

      const link = inventoryPage.getItemLinkByIndex(index);
      await link.click();

      const detailName = await inventoryPage.itemName.textContent();
      const detailDesc = await inventoryPage.itemDesc.textContent();
      const detailPrice = await inventoryPage.itemPrice.textContent();

      expect(name || "").toBe(detailName || "");
      expect(desc || "").toBe(detailDesc || "");
      expect(price || "").toBe(detailPrice || "");
    });
  }
});

test.describe("Sort Inventory", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = users.standard;
    await loginPage.login(user);
  });

  const sortCases = [
    {
      name: "Name (A to Z)",
      value: "az",
      expectedFirst: "Sauce Labs Backpack",
      expectedLast: "Test.allTheThings() T-Shirt (Red)",
    },
    {
      name: "Name (Z to A)",
      value: "za",
      expectedFirst: "Test.allTheThings() T-Shirt (Red)",
      expectedLast: "Sauce Labs Backpack",
    },
    {
      name: "Price (low to high)",
      value: "lohi",
      expectedFirst: "Sauce Labs Onesie",
      expectedLast: "Sauce Labs Fleece Jacket",
    },
    {
      name: "Price (high to low)",
      value: "hilo",
      expectedFirst: "Sauce Labs Fleece Jacket",
      expectedLast: "Sauce Labs Onesie",
    },
  ];

  for (const sort of sortCases) {
    test(`should sort ${sort.name}`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.goto();

      // Action
      await inventoryPage.sortContainer.selectOption(sort.value);

      // Assertions
      const firstName = inventoryPage.getFirstItemName();
      const lastName = inventoryPage.getLastItemName();
      await expect(firstName).toHaveText(sort.expectedFirst);
      await expect(lastName).toHaveText(sort.expectedLast);
    });
  }
});
