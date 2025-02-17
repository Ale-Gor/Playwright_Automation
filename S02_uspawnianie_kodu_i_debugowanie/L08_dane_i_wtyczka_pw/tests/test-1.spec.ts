import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment tests', () => {
    test.beforeEach(async ({ page }) => {
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;;

        await page.goto('/')
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test('Simple payment', async ({ page }) => {
        //Arrange
        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7890 1234 5677 8901 23456';
        const transferAmmount = '222';
        const expectedMessage = `Przelew wykonany! ${transferAmmount},00PLN dla ${transferReceiver}`;

        //Act
        await page.getByTestId('transfer_receiver').fill(transferReceiver);
        await page.getByTestId('form_account_to').fill(transferAccount);
        await page.getByTestId('form_amount').fill(transferAmmount);
        await page.getByRole('button', { name: 'wykonaj przelew' }).click();
        await page.getByTestId('close-button').click();

        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});