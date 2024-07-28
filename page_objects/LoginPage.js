import { expect } from "playwright/test"

class LoginPage{
    constructor(page){
        this.page = page
        this.txtUserName = '#user-name'
        this.txtPassword = '#password'
        this.btnLogin = '#login-button'
        this.msgLockedUser = 'data-test=error'
    }

    async login(username, password){
        await this.page.fill(this.txtUserName, username)
        await this.page.fill(this.txtPassword, password)
        await this.page.click(this.btnLogin)
    }

    async validateLockedUserMessage(){
        await expect(this.page.locator(this.msgLockedUser)).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    }
}

module.exports = LoginPage