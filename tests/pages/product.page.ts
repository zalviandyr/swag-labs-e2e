import { type Page } from "@playwright/test";
import { baseUrl } from "../helpers/constants";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
