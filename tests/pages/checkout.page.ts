import { type Page, type Locator } from "@playwright/test";
import { cartUrl } from "../helpers/constants";
import { Recipient } from "../types/recipient";

export class CheckoutPage {
  readonly page: Page;

  readonly inventoryItems: Locator;

  readonly checkoutBtn: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly backHomeBtn: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalInput: Locator;

  readonly paymentLabel: Locator;
  readonly paymentValue: Locator;
  readonly shippingLabel: Locator;
  readonly shippingValue: Locator;
  readonly subtotalLabel: Locator;
  readonly totalLabel: Locator;

  readonly completeContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalInput = page.locator('[data-test="postalCode"]');

    this.paymentLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentValue = page.locator('[data-test="payment-info-value"]');
    this.shippingLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingValue = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    this.completeContainer = page.locator('[data-test="checkout-complete-container"]');
  }

  async goto() {
    await this.page.goto(cartUrl);
  }

  getRemoveBtnByIndex(index: number): Locator {
    return this.inventoryItems.nth(index).getByRole("button", { name: /remove/i });
  }

  async fillForm(recipient: Recipient) {
    await this.firstNameInput.fill(recipient.firstName);
    await this.lastNameInput.fill(recipient.lastName);
    await this.postalInput.fill(recipient.postal.toString());
  }
}
