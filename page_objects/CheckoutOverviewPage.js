import { expect } from "@playwright/test"

class CheckoutOverviewPage{
    constructor(page) {
        this.page = page
        this.lblTitle = 'data-test=title'
        this.btnCancel = 'data-test=cancel'
        this.btnContinue = 'data-test=finish'
    }

    async validatePageTitle() {
        await expect(this.page.locator(this.lblTitle)).toHaveText("Checkout: Overview")
    }
    
    async validatePageUrl(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    }

    async clickBtnCancel(){
      await this.page.click(this.btnCancel)
    }

    async clickBtnContinue(){
      await this.page.click(this.btnContinue)
    }

}

module.exports = CheckoutOverviewPage