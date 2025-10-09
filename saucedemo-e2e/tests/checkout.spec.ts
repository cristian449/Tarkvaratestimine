import { test, expect, Page } from '@playwright/test';

const USER = 'standard_user';
const PASS = 'secret_sauce';

async function login(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USER);
  await page.getByPlaceholder('Password').fill(PASS);


  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}




async function startCheckout(page: Page) {
  await page.locator('.inventory_item').first().getByRole('button', { name: /add to cart/i }).click();

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html/);
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

test.beforeEach(async ({ page }) => {

  await login(page);
});




test('Mine Overview page vaatesse õigete väljadega', async ({ page }) => {
  await startCheckout(page);

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await expect(page.locator('.summary_subtotal_label')).toBeVisible();
});


test('Pole Eesnime error', async ({ page }) => {
  await startCheckout(page);
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();

  
  await expect(page.getByText('Error: First Name is required')).toBeVisible();
});

test('Pole perenime error', async ({ page }) => {
  await startCheckout(page);
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Error: Last Name is required')).toBeVisible();
});

test('Zipcode puudub', async ({ page }) => {
  await startCheckout(page);
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Error: Postal Code is required')).toBeVisible();



});



test('Canecel nuppue vajutatud viib tagasi cart vaatesse', async ({ page }) => {
  await startCheckout(page);
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Your Cart')).toBeVisible();

});

