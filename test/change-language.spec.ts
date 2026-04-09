import { test, expect } from '@playwright/test';
require('dotenv').config();

test('Authorized user can change interface language in Wikipedia', async ({ page }) => {
// Авторизація
await page.goto('https://www.wikipedia.org/');
await page.click('#js-link-box-en');

const loginLink = page.getByRole('link', { name: 'Log in' });
await loginLink.click();

// Заповнення форми логіну
const usernameInput = page.getByRole('textbox', { name: 'Username' });
await page.fill('#wpName1', process.env.WIKI_USER!);
const passwordInput = page.getByRole('textbox', { name: 'Password' });
await page.fill('#wpPassword1', process.env.WIKI_PASS!);

await page.click('#wpLoginAttempt');

await page.getByRole('button', { name: 'Personal tools' }).check();
await page.getByRole('link', { name: 'Preferences' }).click();
await page.locator('.oo-ui-indicatorElement-indicator.oo-ui-indicator-down').first().click();
await page.getByRole('option', { name: 'uk - українська' }).click();
await page.getByRole('button', { name: 'Save' }).click();


// Перевірка, що інтерфейс змінився
const isSettingVisible = await page.getByRole('heading', { name: 'Налаштування' }).isVisible();
const heading = page.getByRole('heading', { level: 1 });
await expect(heading).toHaveText('Налаштування'); 

//Перевірка атрибута lang у тегу <html> (найбільш технічно правильний спосіб)
const htmlTag = page.locator('html');
await expect(htmlTag).toHaveAttribute('lang', 'uk');

});

test('ua language in Wikipedia', async ({ page }) => {
  // Авторизація
  await page.goto('https://www.wikipedia.org/');
  await page.click('#js-link-box-en');

  const loginLink = page.getByRole('link', { name: 'Log in' });
  await loginLink.click();
  
  // Заповнення форми логіну
  const usernameInput = page.getByRole('textbox', { name: 'Username' });
  await page.fill('#wpName1', process.env.WIKI_USER!);
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  await page.fill('#wpPassword1', process.env.WIKI_PASS!);
  await page.waitForTimeout(300);
  await page.click('#wpLoginAttempt');
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Особисті інструменти' }).check();
  await page.getByRole('link', { name: 'Налаштування' }).click();
  await page.locator('.oo-ui-indicatorElement-indicator.oo-ui-indicator-down').first().click();
  await page.getByRole('option', { name: 'en - English' }).click();
  await page.getByRole('button', { name: 'Зберегти' }).click();

});
