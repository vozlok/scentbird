import { Page, Locator } from '@playwright/test';
import { RegisterPage } from '../register/RegisterPage';

export class GiftMonthCartModalPage {
    readonly page: Page;

    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-testid="modalPrimaryButton"]');
    }

    private async clickCheckout() {
        await this.checkoutButton.click();
    }

    async proceedToRegister(): Promise<RegisterPage> {
        await this.clickCheckout();
        const registerPage = new RegisterPage(this.page);
        await registerPage.assertOnRegisterPage();
        return registerPage;
    }
}
