const LoginPage = require('../page_objects/LoginPage')
const ProductsPage = require('../page_objects/ProductsPage')
const YourCartPage = require('../page_objects/YourCartPage')
import login from '../fixtures/login.json'
import cliente from '../fixtures/clientes.json'
import { time } from 'console'

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
  
}

export async function setCheckoutComplete(page) {
  
}
