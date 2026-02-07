import { test as base } from '@playwright/test';
import { GiftMonthPage } from '../../pages/gift/GiftMonthPage';

type GiftFixtures = {
  gift6MonthPage: GiftMonthPage;
};

export const test = base.extend<GiftFixtures>({
  gift6MonthPage: async ({ page }, use) => {
    const giftMonthPage = new GiftMonthPage(page);
    await giftMonthPage.open(6);
    await use(giftMonthPage);
  },
});

export { expect } from '@playwright/test';
