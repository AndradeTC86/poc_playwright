import { expect } from "@playwright/test"

class CheckoutOverviewPage{
    constructor(page) {
        this.page = page
        this.lblTitle = "data-test=title"
    }

    async validatePageTitle() {
        await expect(this.page.locator(this.lblTitle)).toHaveText("Checkout: Overview")
      }
    
      async validatePageUrl(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
      }



}

module.exports = CheckoutOverviewPage