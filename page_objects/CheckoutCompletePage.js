import { expect } from "@playwright/test"

class CheckoutCompletePage{
    constructor(page) {
        this.page = page
        this.lblTitle = 'data-test=title'
        this.btnBackHome = 'data-test=back-to-products'
        this.msgHeader = '.complete-header'
        this.msgOrder = '.complete-text'
    }

    async validatePageTitle() {
        await expect(this.page.locator(this.lblTitle)).toHaveText("Checkout: Complete!")
    }
    
    async validatePageUrl(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    }

    async validateHeaderMessage(){
      await expect(this.page.locator(this.msgHeader)).toHaveText("Thank you for your order!")
    }

    async validateOrderMessage(){
        await expect(this.page.locator(this.msgOrder)).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
      }

    async clickBtnBackToHome(){
      await this.page.click(this.btnBackHome)
    }

}

module.exports = CheckoutCompletePage