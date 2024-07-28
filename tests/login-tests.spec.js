const { test, request, expect } = require('@playwright/test')
const LoginPage = require('../page_objects/LoginPage')
const ProductsPage = require('../page_objects/ProductsPage')
const login = require('../fixtures/login.json')

test.describe('Testar feature login', () => {

    let loginPage
    let productsPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)
        await loginPage.page.goto('/')
    })

    test('Realizar login com usuário standard', async () => {
        await loginPage.login(login.standard, login.password)
        await productsPage.validatePageTitle()
    })

    test('Realizar login com usuário bloqueado', async () => {
        await loginPage.login(login.locked, login.password)
        await loginPage.validateLockedUserMessage()
    })

    test('Realizar login com usuário com problema', async () => {
        await loginPage.login(login.problem, login.password)
        await productsPage.validateWrongImage()        
    })

    test('Realizar login com usuário com erros de performance', async () => {
        await loginPage.login(login.performance, login.password)
        await productsPage.validateResponseTime()    
    })

    test('Realizar login com usuário com erro de layout', async () => {
        await loginPage.login(login.visual, login.password)
        await productsPage.validateLargeImage()      
    })

})