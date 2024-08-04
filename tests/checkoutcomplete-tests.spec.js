const { test } = require('@playwright/test')
const ProductsPage = require('../page_objects/ProductsPage')
const CheckoutCompletePage = require('../page_objects/CheckoutCompletePage')
import { setCheckoutComplete } from '../utils/commands'

test.describe('Testar feature Checkout Complete', () => {

    let checkoutCompletePage

    test.beforeEach(async ({ page }) => {
        await setCheckoutComplete(page)
        checkoutCompletePage = new CheckoutCompletePage(page)
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
    })

    test('Clicar no botão voltar para home deve voltar a página de produtos', async ({ page }) => {
        await checkoutCompletePage.clickBtnBackToHome()
        let productsPage
        productsPage = new ProductsPage(page)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()        
    })
})