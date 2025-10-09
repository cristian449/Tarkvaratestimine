import { test, expect, Page } from '@playwright/test';

const USER = 'standard_user';
const PASS = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USER);
  await page.getByPlaceholder('Password').fill(PASS);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
});



async function getProductNames(page: Page): Promise<string[]> {

  return await page.locator('.inventory_item_name').allInnerTexts();
}

async function getProductPrices(page: Page): Promise<number[]> {

  const prices = await page.locator('.inventory_item_price').allInnerTexts();
  return prices.map(p => parseFloat(p.replace('$', '')));
}



test('Sorteeri Name (A to Z)', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('az');
  const names = await getProductNames(page);
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);

});

test('Sorteeri Name (Z to A)', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('za');
  const names = await getProductNames(page);
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);


});




test('Sorteeri Price (low to high)', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('lohi');
  const prices = await getProductPrices(page);
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);


});




test('Sorteeri Price (high to low)', async ({ page }) => {
  await page.locator('.product_sort_container').selectOption('hilo');
  const prices = await getProductPrices(page);

  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});
