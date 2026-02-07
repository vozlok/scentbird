import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;

    readonly textH1: Locator;
    readonly signUpButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.textH1 = page.locator('h1 span');
        this.signUpButton = page.locator('[data-testid="registerButton"]');
    }

    async open() {
        await this.page.goto('/register');
    }

    async verifyGiftRedirectUrl() {
        await expect(this.page).toHaveURL(/\/register\?redirect=%2Fsubscription%2Fpayment/);
    }
    
    async verifyTextH1() {
        await expect(this.textH1).toBeVisible();
        await expect(this.textH1).toHaveText('Create your account');
    }
    
    async checkSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toBeEnabled();
    }

    async assertOnRegisterPage() {
        await this.verifyGiftRedirectUrl();
        await this.verifyTextH1();
        await this.checkSignUpButton();
    }

}       