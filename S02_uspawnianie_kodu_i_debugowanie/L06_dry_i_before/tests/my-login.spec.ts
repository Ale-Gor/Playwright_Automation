import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/';
   
  test.beforeEach (async ({ page }) => {
    await page.goto(url); 
  })


  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPassword = '10987654';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const userId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const password = '1234';
    const errorPasswordMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      errorPasswordMessage,
    );
  });
});
