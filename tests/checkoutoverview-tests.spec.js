const { test } = require('@playwright/test')
const CheckoutOverviewPage = require('../page_objects/CheckoutOverviewPage')
const ProductsPage = require('../page_objects/ProductsPage')
const CheckoutCompletePage = require('../page_objects/CheckoutCompletePage')
import { setCheckoutOverview } from '../utils/commands'

test.describe('Testar feature Checkout Overview', () => {

    let checkoutOverviewPage

    test.beforeEach(async ({ page }) => {
        await setCheckoutOverview(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        await checkoutOverviewPage.validatePageTitle()
        await checkoutOverviewPage.validatePageUrl()
    })

    test('Botão cancelar deve voltar para a página de produtos', async ({ page }) => {
        await checkoutOverviewPage.clickBtnCancel()
        let productsPage = new ProductsPage(page)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()        
    })

    test('Botão continuar deve finalizar o pedido', async ({ page }) => {        
        await checkoutOverviewPage.clickBtnContinue()
        let checkoutCompletePage = new CheckoutCompletePage(page)
        await checkoutCompletePage.validatePageTitle()
        await checkoutCompletePage.validatePageUrl()
        await checkoutCompletePage.validateHeaderMessage()
        await checkoutCompletePage.validateOrderMessage()
    })
})