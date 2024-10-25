const { test } = require('@playwright/test')
const ProductsPage = require('../page_objects/ProductsPage')
const YourCartPage = require('../page_objects/YourCartPage')
const CheckoutYourInformation = require('../page_objects/CheckoutYourInformationPage')
import { setCart } from '../utils/commands'

test.describe('Testar feature Your Cart', () => {

    let yourCartPage

    test.beforeEach(async ({ page }) => {
        await setCart(page)        
        yourCartPage = new YourCartPage(page)
        await yourCartPage.validatePageTitle()
        await yourCartPage.validatePageUrl()
    })

    test('Validar botão continuar comprando', async ({ page }) => {
        await yourCartPage.clickBtnContinueShopping()
        let productsPage = new ProductsPage(page)
        await productsPage.validatePageTitle()
        
    })

    test('Validar botão remover produto', async () => {
        await yourCartPage.clickBtnRemoveFromCart()
        await yourCartPage.validateProductNameNotVisible()
    })

    test('Validar botão checkout', async ({ page }) => {
        await yourCartPage.clickBtnCheckout()
        let checkoutYourInfo = new CheckoutYourInformation(page)
        await checkoutYourInfo.validatePageTitle()
    })
})