import { type Locator, type Page } from "@playwright/test";
import { baseUrl, inventoryUrl } from "../helpers/constants";

export class InventoryPage {
  readonly page: Page;

  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortContainer: Locator;

  readonly itemName: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;

  readonly addBtn: Locator;
  readonly removeBtn: Locator;

  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryList = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async goto() {
    await this.page.goto(inventoryUrl);
  }

  getFirstItemName(): Locator {
    return this.inventoryItems.first().locator('[data-test="inventory-item-name"]');
  }

  getLastItemName(): Locator {
    return this.inventoryItems.last().locator('[data-test="inventory-item-name"]');
  }

  getItemByIndex(index: number): Locator {
    return this.inventoryItems.nth(index);
  }

  getItemLinkByIndex(index: number): Locator {
    return this.getItemByIndex(index)
      .locator('[data-test="inventory-item-description"]')
      .locator("a");
  }

  getItemNameByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('[data-test="inventory-item-name"]');
  }

  getItemDescByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('[data-test="inventory-item-desc"]');
  }

  getItemPriceByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('[data-test="inventory-item-price"]');
  }
}
