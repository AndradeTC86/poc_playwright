import { expect, request } from "playwright/test"

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.lblTitle = "data-test=title"
    this.imgProduct = "data-test=inventory-item-sauce-labs-backpack-img"
  }

  async validatePageTitle() {
    await expect(this.page.locator(this.lblTitle)).toHaveText("Products")
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
