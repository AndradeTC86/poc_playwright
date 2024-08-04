import { expect } from "@playwright/test"

class CheckoutYourInformation{
    constructor(page) {
        this.page = page
        this.lblTitle = 'data-test=title'
        this.btnCancel = 'data-test=cancel'
        this.btnContinue = 'data-test=continue'
        this.txtFirstName = 'data-test=firstName'
        this.txtLastName = 'data-test=lastName'
        this.txtZipCode = 'data-test=postalCode'
        this.msgError = '.error-message-container'
    }

      async validatePageTitle() {
        await expect(this.page.locator(this.lblTitle)).toHaveText("Checkout: Your Information")
      }
    
      async validatePageUrl(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
      }

      async clickBtnCancel(){
        await this.page.click(this.btnCancel)
      }

      async clickBtnContinue(){
        await this.page.click(this.btnContinue)
      }

      async validateTxtFirstNameEmpty(){
        await expect(this.page.locator(this.txtFirstName)).toBeEmpty()
      }

      async validateTxtLastNameEmpty(){
        await expect(this.page.locator(this.txtLastName)).toBeEmpty()
      }

      async validateTxtZipCodeEmpty(){
        await expect(this.page.locator(this.txtZipCode)).toBeEmpty()
      }

      async fillTextFields(firstName, lastName, zipCode){
        await this.page.fill(this.txtFirstName, firstName)
        await this.page.fill(this.txtLastName, lastName)
        await this.page.fill(this.txtZipCode, zipCode)
    }

    async fillTxtFirstName(firstName){
        await this.page.fill(this.txtFirstName, firstName)
    }

    async fillTxtLastName(lastName){
        await this.page.fill(this.txtLastName, lastName)
    }

    async validateFirstNameRequiredMessage(){
        await expect(this.page.locator(this.msgError)).toHaveText('Error: First Name is required')
    }

    async validateLastNameRequiredMessage(){
        await expect(this.page.locator(this.msgError)).toHaveText('Error: Last Name is required')
    }

    async validateZipCodeRequiredMessage(){
        await expect(this.page.locator(this.msgError)).toHaveText('Error: Postal Code is required')
    }

}

module.exports = CheckoutYourInformation