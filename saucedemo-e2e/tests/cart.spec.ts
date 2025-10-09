import { test, expect } from '@playwright/test';

const USER = 'standard_user';
const PASS = 'secret_sauce';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
});


test('lisa esimene toode korvi ja kontrolli', async ({ page }) => {
  const firstItem = page.locator('.inventory_item').first(); // võta esimene tootekaar
  await expect(firstItem).toBeVisible();

  await firstItem.locator('button:has-text("Add to cart")').click(); // lisa korvi

  const cartBadge = page.locator('#shopping_cart_container .shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');                   // korvi badge = 1

  await page.locator('#shopping_cart_container a').click();  // mine korvi
  await expect(page).toHaveURL(/cart\.html/);

  await expect(page.locator('.cart_item')).toHaveCount(1);   // korvis 1 rida
});

test('Lisa kaks erinevat toodet, eemalda üks, kontrolli badge ja sisu', async ({ page }) => {
  const items = page.locator('.inventory_item');
  const firstItem = items.nth(0);
  const secondItem = items.nth(1);

  await firstItem.locator('button').click();
  await secondItem.locator('button').click();

  const badge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(badge).toHaveText('2');

  await firstItem.locator('button').click(); 

  await expect(badge).toHaveText('1');
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/cart\.html/);
  const cartItems = await page.locator('.cart_item').allInnerTexts();
  expect(cartItems.length).toBe(1);
});





