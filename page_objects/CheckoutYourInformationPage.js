import { expect } from "@playwright/test"

class CheckoutYourInformation{
    constructor(page) {
        this.page = page
        this.lblTitle = "data-test=title"   
    }

      async validatePageTitle() {
        await expect(this.page.locator(this.lblTitle)).toHaveText("Checkout: Your Information")
      }
    
      async validatePageUrl(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
      }

}

module.exports = CheckoutYourInformation