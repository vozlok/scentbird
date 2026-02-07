
import { Locator, Page } from '@playwright/test';

export class GiftPage {
	readonly page: Page;
	readonly gift3Month: Locator;
	readonly gift6Month: Locator;
	readonly gift12Month: Locator;

	constructor(page: Page) {
		this.page = page;
		this.gift3Month = page.locator('[data-testid="continueWith3MonthsButton"]');
		this.gift6Month = page.locator('[data-testid="continueWith6MonthsButton"]');
		this.gift12Month = page.locator('[data-testid="continueWith12MonthsButton"]');
	}

	async open() {
		await this.page.goto('/gift');
	}

	async selectGiftSubscription(months: number) {
        switch (months) {
            case 3: await this.gift3Month.click(); break;
            case 6: await this.gift6Month.click(); break;
            case 12: await this.gift12Month.click(); break;
            default: throw new Error(`Unsupported gift subscription duration: ${months} months`);
        }
    }       
}
