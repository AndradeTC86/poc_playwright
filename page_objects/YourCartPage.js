import { expect } from "@playwright/test"
const produtos = require('../fixtures/produtos.json')

class YourCartePage {
  constructor(page) {
    this.page = page
    this.lblTitle = "data-test=title"
    this.lblItemName = "data-test=inventory-item-name"
  }

  async validatePageTitle() {
    await expect(this.page.locator(this.lblTitle)).toHaveText("Products")
  }

  async validateProductName(){
    await expect(this.page.locator(this.lblItemName)).toHaveText(produtos[0].name)
  }
}

module.exports = YourCartePage