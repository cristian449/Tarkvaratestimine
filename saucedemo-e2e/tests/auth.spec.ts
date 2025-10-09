import { test, expect } from '@playwright/test';

const USER = 'standard_user';
const PASS = 'secret_sauce';

test('logi edukalt sisse', async ({ page }) => {
  await page.goto('/');                                   // avame login-lehe (tänu baseURL)
  await page.getByPlaceholder('Username').fill(USER);     // leiab input placeholderi järgi
  await page.getByPlaceholder('Password').fill(PASS);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);        // kontroll: jõudsime tootekataloogi
  await expect(page.getByText('Products')).toBeVisible(); // kontroll: pealkiri on olemas
});

test('vale parool -> veateade ja URL ei muutu', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USER);
  await page.getByPlaceholder('Password').fill('wrong');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Epic sadface/i)).toBeVisible(); // kontroll: veateade
  await expect(page).toHaveURL('https://www.saucedemo.com/');  // kontroll: ikka login-lehel
});

test('logout menüüst', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USER);
  await page.getByPlaceholder('Password').fill(PASS);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Open Menu' }).click(); // avame burger-menüü
  await page.getByRole('link', { name: 'Logout' }).click();       // vajutame Logout

  await expect(page).toHaveURL('https://www.saucedemo.com/');     // tagasi login-lehel
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});


test('locked_out_user =>  õige veateade ja URL jääb samaks', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Sorry, this user has been locked out.')).toBeVisible();
  await expect(page).toHaveURL('/');
});

test('tühjad väljad => õige veateade (puudub kasutajanimi)', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Password').fill(PASS);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Epic sadface/)).toBeVisible();
  await expect(page).toHaveURL('/');
});

test('tühjad väljad => õige veateade (puudub parool)', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USER);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Epic sadface/i)).toBeVisible();
  await expect(page).toHaveURL('/');
});

