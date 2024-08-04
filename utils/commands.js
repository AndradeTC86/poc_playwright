const LoginPage = require('../page_objects/LoginPage')
const ProductsPage = require('../page_objects/ProductsPage')
const YourCartPage = require('../page_objects/YourCartPage')
const CheckoutYourInfoPage = require('../page_objects/CheckoutYourInformationPage')
const CheckoutOverviewPage = require('../page_objects/CheckoutOverviewPage')
import login from '../fixtures/login.json'
import cliente from '../fixtures/clientes.json'

export async function autoLogin(page) {
  const loginPage = new LoginPage(page)
  await loginPage.goto('/')
  await loginPage.login(login.standard, login.password)
}

export async function setCart(page) {
  await autoLogin(page)
  const productsPage = new ProductsPage(page)
  await productsPage.clickBtnAddtoCart()
  await productsPage.clickBtnGoToCart()
}

export async function setCheckout(page) {
  await setCart(page)
  const yourCartPage = new YourCartPage(page)
  await yourCartPage.clickBtnCheckout()
}

export async function setCheckoutOverview(page) {
  await setCheckout(page)
  const checkoutYourInfoPage = new CheckoutYourInfoPage(page)
  await checkoutYourInfoPage.fillTextFields(cliente.firstName, cliente.lastName, cliente.zipCode)
  await checkoutYourInfoPage.clickBtnContinue()
}

export async function setCheckoutComplete(page) {
  await setCheckoutOverview(page)
  const checkoutOverviewPage = new CheckoutOverviewPage(page)
  await checkoutOverviewPage.clickBtnContinue()
}
