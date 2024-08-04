import { expect } from "@playwright/test"
const produto = require('../fixtures/produtos.json')

class YourCartePage {
  constructor(page) {
    this.page = page
    this.lblTitle = "data-test=title"
    this.lblItemName = "data-test=inventory-item-name"
    this.btnContinueShopping = 'data-test=continue-shopping'
    this.btnCheckout = 'data-test=checkout'    
  }

  async validatePageTitle() {
    await expect(this.page.locator(this.lblTitle)).toHaveText("Your Cart")
  }

  async validatePageUrl(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
  }

  async validateProductName(){
    await expect(this.page.locator(this.lblItemName)).toHaveText(produto[0].name)
  }

  async validateProductNameNotVisible(){
    await expect(this.page.locator(this.lblItemName)).not.toBeVisible()
  }

  async clickBtnContinueShopping(){
    await this.page.click(this.btnContinueShopping)
  }

  async clickBtnCheckout(){
    await this.page.click(this.btnCheckout)
  }

  getBtnRemoveFromCart(produto){
    return this.page.locator(`[data-test="remove-${produto}"]`)
  }

  async clickBtnRemoveFromCart(){
    await this.getBtnRemoveFromCart(produto[0].produto).click()
  }

}

module.exports = YourCartePage