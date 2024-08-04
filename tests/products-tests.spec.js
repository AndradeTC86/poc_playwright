const { test } = require('@playwright/test')
const LoginPage = require('../page_objects/LoginPage')
const ProductsPage = require('../page_objects/ProductsPage')
const login = require('../fixtures/login.json')
const produtos = require('../fixtures/produtos.json')

test.describe('Testar feature lista de produtos', () => {

    let loginPage
    let productsPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)
        await loginPage.page.goto('/')
        await loginPage.login(login.standard, login.password)
        await productsPage.validatePageTitle()
        await productsPage.validatePageUrl()
    })

    test.only('Inserir produto no carrinho e validar que foi gravado corretamente no carrinho', async () => {
        await productsPage.clickBtnAddtoCart()

    })
})