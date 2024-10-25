const { test } = require('@playwright/test')
const ProductsPage = require('../page_objects/ProductsPage')
const YourCartPage = require('../page_objects/YourCartPage')
import { autoLogin } from '../utils/commands'

test.describe('Testar feature lista de produtos', () => {

    let productsPage

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page)
        await autoLogin(page)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })

    test('Inserir produto no carrinho e validar que foi gravado corretamente no carrinho', async ({ page }) => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickBtnGoToCart()
        let yourCartPage = new YourCartPage(page)
        await yourCartPage.validateProductName()
    })

    test('Remover produto do carrinho pela página de produtos', async () => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.validateBtnRemoveFromCartVisible()
        await productsPage.clickBtnRemoveFromCart()
        await productsPage.validateBdgShoppingCartNotVisible()
        await productsPage.validateBtnAddToCartVisible()
    })

    test('Adicionar produto no carrinho pela página do produto e verificar que gravou corretamente no carrinho', async ({ page }) => {
        await productsPage.clickImgProduct()
        await productsPage.clickBtnAddToCartFromProductPage()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickBtnGoToCart()
        let yourCartPage = new YourCartPage(page)
        await yourCartPage.validateProductName()
    })

    test('Remover produto do carrinho pela página do produto e voltar a página de produtos', async () => {
        await productsPage.clickBtnAddtoCart()
        await productsPage.validateBdgShoppingCartNumber('1')
        await productsPage.clickImgProduct()
        await productsPage.validateBtnRemoveFromCartFromProductPageVisible()
        await productsPage.clickBtnRemoveFromCartFromProductPage()
        await productsPage.validateBdgShoppingCartNotVisible()
        await productsPage.validateBtnAddToCartFromProductPageVisible()
        await productsPage.clickLinkBackToProducts()
        await productsPage.validatePageTitle()
    })

    test('Validar adicionar e remover todos os produtos no carrinho', async () => {
        await productsPage.clickBtnAddToCartAllProducts()
        await productsPage.validateBdgShoppingCartNumber('6')
        await productsPage.clickBtnRemoveFromCartAllProducts()
        await productsPage.validateBdgShoppingCartNotVisible()
    })

    test('Validar ordenação padrão em ordem alfabética crescente', async () => {
        await productsPage.validateSortedProductsAtoZ()
    })

    test('Ordenar produtos em ordem alfabética decrescente', async () => {
        await productsPage.orderByNameZtoA()
        await productsPage.validateSortedProductsZtoA()
    })

    test('Ordenar produtos em preço do menor para o maior', async () => {
        await productsPage.orderByPriceLowtoHigh()
        await productsPage.validateSortedProductsLowToHigh()
    })

    test('Ordenar produtos em preço do maior para o menor', async () => {
        await productsPage.orderByPriceHightoLow()
        await productsPage.validateSortedProductsHighToLow()
    })
})