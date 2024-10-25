const { test } = require('@playwright/test')
const YourCartPage = require('../page_objects/YourCartPage')
const CheckoutYourInformation = require('../page_objects/CheckoutYourInformationPage')
const CheckoutOverviewPage = require('../page_objects/CheckoutOverviewPage')
import { setCheckout } from '../utils/commands'
const cliente = require('../fixtures/clientes.json')

test.describe('Testar feature Checkout Your Information', () => {

    let checkoutYourInfoPage    

    test.beforeEach(async ({ page }) => {
        await setCheckout(page)
        checkoutYourInfoPage = new CheckoutYourInformation(page)
        await checkoutYourInfoPage.validatePageTitle()
        await checkoutYourInfoPage.validatePageUrl()
    })

    test('Clicar botão cancelar deve retornar ao carrinho e não salva as informações', async ({ page }) => {        
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnCancel()
        let yourCartPage = new YourCartPage(page)
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
        await yourCartPage.clickBtnCheckout()
        await checkoutYourInfoPage.validateTxtFirstNameEmpty()
        await checkoutYourInfoPage.validateTxtLastNameEmpty()
        await checkoutYourInfoPage.validateTxtZipCodeEmpty()
    })

    test('Validar preencher os campos de texto e clicar em continuar', async ({ page }) => {        
        await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
        await checkoutYourInfoPage.clickBtnContinue()
        let checkoutOverviewPage = new CheckoutOverviewPage(page)
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    test('Validar obrigatoriedade dos campos de texto', async () => {        
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateFirstNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtFirstName(cliente.firstName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateLastNameRequiredMessage()
        await checkoutYourInfoPage.fillTxtLastName(cliente.lastName)
        await checkoutYourInfoPage.clickBtnContinue()
        await checkoutYourInfoPage.validateZipCodeRequiredMessage()
    })
})
