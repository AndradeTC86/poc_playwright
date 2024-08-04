import { expect, request } from "playwright/test"
const produtos = require('../fixtures/produtos.json')

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.lblTitle = "data-test=title"
    this.imgProduct = "data-test=inventory-item-sauce-labs-backpack-img"
    this.btnCart = '.shopping-cart-link'
    this.bdgShoppingCart = '.shopping_cart_badge'
    this.lnkBackToProducts = 'data-test=back-to-products'
    this.menuOrdenar = 'data-test=product-sort-container'
    this.btnAddtoCart = 'data-test=add-to-cart'
    this.btnRemovetoCart = 'data-test=remove'
  }

  async validatePageTitle() {
    await expect(this.page.locator(this.lblTitle)).toHaveText("Products")
  }

  async validatePageUrl(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  }

  getBtnAddtoCart(produto){
    return this.page.locator(`[data-test="add-to-cart-${produto}"]`)
  }

  async clickBtnAddtoCart(){
    await this.getBtnAddtoCart(produtos[0].produto).click()
  }

  async validateWrongImage() {
    const imgSrc = await this.page
      .locator(this.imgProduct)
      .first()
      .getAttribute("src");
    expect(imgSrc).toBe("/static/media/sl-404.168b1cce.jpg")
  }

  async validateResponseTime() {
    const apiRequest = await request.newContext()
    const startTime = Date.now();
    const response = await apiRequest.post(
        'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN',
        {
            method: 'POST',
            failOnStatusCode: false,
        }
    )
    const endTime = Date.now()    
    const responseDuration = endTime - startTime
    expect(responseDuration).toBeGreaterThan(400)
  }

  async validateLargeImage(){
    const imgSrc = await this.page.locator(this.imgProduct)
    const boundingBox = await imgSrc.boundingBox()
    const width = Math.round(boundingBox.width)
    const height = Math.round(boundingBox.height)     
    expect(width).toBe(262)
    expect(height).toBe(238)
  }
}

module.exports = ProductsPage;
