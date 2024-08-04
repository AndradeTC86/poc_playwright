import { expect, request } from "playwright/test"
const produto = require('../fixtures/produtos.json')

class ProductsPage {
  constructor(page) {
    this.page = page
    this.lblTitle = 'data-test=title'
    this.imgProduct = 'data-test=inventory-item-sauce-labs-backpack-img'
    this.btnCart = 'data-test=shopping-cart-link'
    this.bdgShoppingCart = '.shopping_cart_badge'
    this.lnkBackToProducts = 'data-test=back-to-products'
    this.menuOrdenar = 'data-test=product-sort-container'
    this.btnAddToCart = 'data-test=add-to-cart'
    this.btnRemoveFromCart = 'data-test=remove'
    this.lblItemName = '.inventory_item_name'
    this.lblItemPrice = '.inventory_item_price'
  }

  async validatePageTitle() {
    await expect(this.page.locator(this.lblTitle)).toHaveText("Products")
  }

  async validatePageUrl(){
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  }

  getBtnAddToCart(produto){
    return this.page.locator(`[data-test="add-to-cart-${produto}"]`)
  }

  getBtnRemoveFromCart(produto){
    return this.page.locator(`[data-test="remove-${produto}"]`)
  }

  async clickBtnAddtoCart(){
    await this.getBtnAddToCart(produto[0].produto).click()
  }

  async clickBtnRemoveFromCart(){
    await this.getBtnRemoveFromCart(produto[0].produto).click()
  }

  async clickBtnAddToCartFromProductPage(){
    await this.page.click(this.btnAddToCart)
  }

  async clickBtnRemoveFromCartFromProductPage(){
    await this.page.click(this.btnRemoveFromCart)
  }

  async clickBtnAddToCartAllProducts(){
    for (const produtos of produto){
      await this.getBtnAddToCart(produtos.produto).click()
    }
  }

  async clickBtnRemoveFromCartAllProducts(){
    for (const produtos of produto){
      await this.getBtnRemoveFromCart(produtos.produto).click()
    }
  }

  async clickBtnGoToCart(){
    await this.page.click(this.btnCart)
  }

  async clickLinkBackToProducts(){
    await this.page.click(this.lnkBackToProducts)
  }

  async clickImgProduct(){
    await this.page.click(this.imgProduct)
  }

  async orderByNameZtoA(){
    await this.page.locator(this.menuOrdenar).selectOption('Name (Z to A)')
  }

  async orderByPriceLowtoHigh(){
    await this.page.locator(this.menuOrdenar).selectOption('Price (low to high)')
  }

  async orderByPriceHightoLow(){
    await this.page.locator(this.menuOrdenar).selectOption('Price (high to low)')
  }

  async validateBdgShoppingCartNumber(number){
    await expect(this.page.locator(this.bdgShoppingCart)).toHaveText(number)
  }

  async validateBdgShoppingCartNotVisible(){
    await expect(this.page.locator(this.bdgShoppingCart)).not.toBeVisible()
  }

  async validateBtnAddToCartFromProductPageVisible(){
    await expect(this.page.locator(this.btnAddToCart)).toBeVisible
  }

  async validateBtnRemoveFromCartFromProductPageVisible(){
    await expect(this.page.locator(this.btnRemoveFromCart)).toBeVisible
  }

  async validateBtnAddToCartVisible(){
    await expect(this.getBtnAddToCart(produto[0].produto)).toBeVisible()
  }

  async validateBtnRemoveFromCartVisible(){
    await expect(this.getBtnRemoveFromCart(produto[0].produto)).toBeVisible()
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
    const startTime = Date.now()
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

  async validateSortedProductsAtoZ(){
    const items = await this.page.locator(this.lblItemName).allTextContents()
    const sortedItems = [...items].sort()
    expect(items).toEqual(sortedItems)
  }

  async validateSortedProductsZtoA(){
    const items = await this.page.locator(this.lblItemName).allTextContents()
    const sortedItems = [...items].sort().reverse()
    expect(items).toEqual(sortedItems)
  }

  async validateSortedProductsLowToHigh(){
    const items = await this.page.locator(this.lblItemPrice).allTextContents()
    const unsortedPrices = items.map(item => parseFloat(item.replace('$', '')))
    const sortedPrices = [...unsortedPrices].sort((a, b) => a - b)
    expect(unsortedPrices).toEqual(sortedPrices)    
  }

  async validateSortedProductsHighToLow(){
    const items = await this.page.locator(this.lblItemPrice).allTextContents()
    const unsortedPrices = items.map(item => parseFloat(item.replace('$', '')))
    const sortedPrices = [...unsortedPrices].sort((a, b) => b - a)
    expect(unsortedPrices).toEqual(sortedPrices)     
  }



}

module.exports = ProductsPage