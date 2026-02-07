import { Page, Locator, expect } from '@playwright/test';
import { getDateWithOffset } from '../../helpers/dateHelper';

type EmailRecipientForm = {
    recipientName: string;
    recipientEmail: string;
    recipientMessage?: string;
    recipientGender?: 'Cologne' | 'Perfume';
    senderName?: string;
    sendDateOffsetDays?: number;
    sendNow?: boolean;
};

export class GiftMonthPage {
    readonly page: Page;

    readonly priceInfo: Locator;
    readonly emailSharingMethod: Locator;
    readonly linkSharingMethod: Locator;
    readonly recipientName: Locator;
    readonly recipientEmail: Locator;
    readonly recipientMessage: Locator;
    readonly recipientGenderOptionMale: Locator;
    readonly recipientGenderOptionFemale: Locator;
    readonly senderName: Locator;
    readonly sendDateOptionNow: Locator;
    readonly sendDateOptionLater: Locator;
    readonly dateMonth: Locator;
    readonly dateDay: Locator;
    readonly dateYear: Locator;
    readonly payForYourOrderButton: Locator;
    readonly recipientNameError: Locator;
    readonly recipientEmailError: Locator;
    readonly dateError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceInfo = page.locator('main div span:text("6 months gift subscription ($95)")');
        this.emailSharingMethod = page.locator('[data-testid="sharingMethodOptionEmail"]');
        this.linkSharingMethod = page.locator('[data-testid="sharingMethodOptionLink"]');
        this.recipientName = page.locator('[data-testid="recipientName"]');
        this.recipientEmail = page.locator('[data-testid="recipientEmail"]');
        this.recipientMessage = page.locator('[data-testid="recipientMessage"]');
        this.recipientGenderOptionMale = page.locator('[data-testid="recipientGenderOptionMale"]');
        this.recipientGenderOptionFemale = page.locator('[data-testid="recipientGenderOptionFemale"]');
        this.senderName = page.locator('[data-testid="senderName"]');
        this.sendDateOptionNow = page.locator('[data-testid="sendDateOptionNow"]');
        this.sendDateOptionLater = page.locator('[data-testid="sendDateOptionLater"]');
        this.dateMonth = page.locator('[data-testid="dateMonth"]');
        this.dateDay = page.locator('[data-testid="dateDay"]');
        this.dateYear = page.locator('[data-testid="dateYear"]');
        this.payForYourOrderButton = page.locator('[data-testid="checkoutNowButton"]');
        this.recipientNameError = page.locator('[data-testid="recipientNameError"]');
        this.recipientEmailError = page.locator('[data-testid="recipientEmailError"]');
        this.dateError = page.locator('[data-testid="dateError"]');
    }

    async open(numberOfMonths: number) {
        await this.page.goto(`/gift?months=${numberOfMonths}`);
    }

    async selectEmailSharingMethod() {
        await this.emailSharingMethod.click();
    }

    async selectLinkSharingMethod() {
        await this.linkSharingMethod.click();
    }

    async fillRecipientName(name: string) {
        await this.recipientName.fill(name);
    }

    async fillRecipientEmail(email: string) {
        await this.recipientEmail.fill(email);
    }

    async fillRecipientMessage(message: string) {
        await this.recipientMessage.fill(message);
    }

    async selectRecipientGender(recipientGenderOption: string) {
        switch (recipientGenderOption) {
        case 'Cologne':
            await this.recipientGenderOptionMale.click();
            break;
        case 'Perfume':
            await this.recipientGenderOptionFemale.click();
            break;
        default:                
            throw new Error(`Unsupported gender option: ${recipientGenderOption}`);
        }
    }

    async fillSenderName(name: string) {
        await this.senderName.fill(name);
    }

    async selectSendDateOptionNow() {
        await this.sendDateOptionNow.click();
    }

    async selectSendDateOptionLater() {
        await this.sendDateOptionLater.click();
    }

    async setDateToSendGiftWithOffset(offsetDays: number) {
        await this.selectSendDateOptionLater();
        const futureDate = getDateWithOffset(offsetDays);
        const [month, day, year] = futureDate.split('-');
        await this.dateMonth.selectOption(String(parseInt(month)));
        await this.dateDay.selectOption(String(parseInt(day)));
        await this.dateYear.selectOption(year);
    }

    async fillEmailRecipientForm(data: EmailRecipientForm) {
        await this.selectEmailSharingMethod();
        await this.fillRecipientName(data.recipientName);
        await this.fillRecipientEmail(data.recipientEmail);
 
        if (data.recipientMessage) await this.fillRecipientMessage(data.recipientMessage);
        if (data.recipientGender) await this.selectRecipientGender(data.recipientGender);
        if (data.senderName) await this.fillSenderName(data.senderName);
 
        if (data.sendNow) {
            await this.selectSendDateOptionNow();
        } else if (data.sendDateOffsetDays !== undefined) {
            await this.setDateToSendGiftWithOffset(data.sendDateOffsetDays);
        }
    }       

    async clickPayForYourOrder() {
        await this.payForYourOrderButton.click();
    }

    async verifyPriceInfo() {
        await expect(this.priceInfo).toBeVisible();
    }

    async verifyGiftSixMonthRedirectUrl() {
        await this.page.waitForURL('**/gift?months=6');
    }

    async checkRecipientNameError(textError: string) {
        await expect(this.recipientNameError).toBeVisible();
        await expect(this.recipientNameError).toContainText(textError);
    }

    async checkRecipientEmailError(textError: string) {
        await expect(this.recipientEmailError).toBeVisible();
        await expect(this.recipientEmailError).toContainText(textError);
    }

    async verifyInvalidRecipientEmails(textError: string) {
        const invalidEmails = ['testgmail.com', '@no-domain', 'user@', 'test@domain'];

        for (const email of invalidEmails) {
            await this.fillRecipientEmail(email);
            await expect(this.recipientEmail).toHaveValue(email);
            await this.clickPayForYourOrder();
            await this.checkRecipientEmailError(textError);
        }
    }
    
    async checkDateError(textError: string) {
        await expect(this.dateError).toBeVisible();
        await expect(this.dateError).toContainText(textError);
    }
}
