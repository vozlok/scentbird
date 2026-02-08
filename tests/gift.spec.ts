import { test } from './fixtures/giftFixtures';
import { randUser, randLine } from '@ngneat/falso';
import { GiftMonthCartModalPage } from '../pages/gift/GiftMonthCartModalPage';
import { GiftPage, GiftMonths } from '../pages/gift/GiftPage';
import { GiftMonthPage } from '../pages/gift/GiftMonthPage';

test('1.1 guest flow using email address', async ({ gift6MonthPage }) => {
    const user = randUser();
    const message = randLine();
    
    await gift6MonthPage.checkPriceInfo();
    await gift6MonthPage.fillEmailRecipientForm({
        recipientName: `${user.firstName} ${user.lastName}`,
        recipientEmail: user.email,
        recipientMessage: message,
        recipientGender: 'Cologne',
        senderName: randUser().firstName,
        sendDateOffsetDays: 5,
    }); 
    await gift6MonthPage.clickPayForYourOrder();

    const giftCartModalPage = new GiftMonthCartModalPage(gift6MonthPage.page);
    await giftCartModalPage.proceedToRegister();
});

test('1.1 guest flow using email address, required fields only ', async ({ gift6MonthPage }) => {
    const user = randUser();
    
    await gift6MonthPage.checkPriceInfo();
    await gift6MonthPage.fillEmailRecipientForm({
        recipientName: `${user.firstName} ${user.lastName}`,
        recipientEmail: user.email,
        recipientGender: 'Perfume',
        sendNow: true,
    });
    await gift6MonthPage.clickPayForYourOrder();

    const giftCartModalPage = new GiftMonthCartModalPage(gift6MonthPage.page);
    await giftCartModalPage.proceedToRegister();
});

test('1.4 guest flow using share link', async ({ gift6MonthPage }) => {
    await gift6MonthPage.selectLinkSharingMethod();
    await gift6MonthPage.fillSenderName(randUser().firstName);
    await gift6MonthPage.clickPayForYourOrder();

    const giftCartModalPage = new GiftMonthCartModalPage(gift6MonthPage.page);
    await giftCartModalPage.proceedToRegister();
});

test('check correct redirect after choosing 6 month gift subscription on the /gift page', async ({ page }) => {
    const giftPage = new GiftPage(page);
    await giftPage.open();
    await giftPage.selectGiftSubscription(GiftMonths.SIX);

    const giftMonthPage = new GiftMonthPage(giftPage.page);
    await giftMonthPage.checkPriceInfo();
    await giftMonthPage.checkGiftSixMonthRedirectUrl();
});

test('1.3 form validation - required fields', async ({ gift6MonthPage }) => {
    await gift6MonthPage.fillEmailRecipientForm({
        recipientName: '',
        recipientEmail: '',
        sendNow: true,
    });
    await gift6MonthPage.clickPayForYourOrder();
    await gift6MonthPage.checkRecipientNameError('Required');
    await gift6MonthPage.checkRecipientEmailError('Required');
});

test('1.3 form validation - invalid recipient email', async ({ gift6MonthPage }) => {
    const user = randUser();
    await gift6MonthPage.selectEmailSharingMethod();
    await gift6MonthPage.fillRecipientName(`${user.firstName} ${user.lastName}`);
    await gift6MonthPage.verifyInvalidRecipientEmails('Valid email address required');
});

test('1.1 guest flow using email address - pick invalid date', async ({ gift6MonthPage }) => {
    const user = randUser();
    const message = randLine();
    
    await gift6MonthPage.checkPriceInfo();
    await gift6MonthPage.fillEmailRecipientForm({
        recipientName: `${user.firstName} ${user.lastName}`,
        recipientEmail: user.email,
        recipientMessage: message,
        recipientGender: 'Cologne',
        senderName: randUser().firstName,
        sendDateOffsetDays: -5,
    });
    await gift6MonthPage.clickPayForYourOrder();
    await gift6MonthPage.checkDateError('Date must be in the future');
});






