// import { test, expect } from '@playwright/test';

// const URL = 'https://www.saucedemo.com'
// const USERNAME = "standard_user"
// const PASSWORD = "secret_sauce"

// test.beforeEach(async ({page}) => {
    
//     await page.goto(URL);
    
//     await page.getByPlaceholder('Username').fill(USERNAME);
//     await page.getByPlaceholder('Password').fill(PASSWORD);
//     await page.getByText('Login').click();

//     await expect(page.getByText('Products')).toBeVisible();

// })


// test("add to cart", async ({page}) => {
//     const firstProduct = page.getByText("Add to cart").first()
//     await firstProduct.click()

//     const cartBadge = page.locator('.shopping_cart_badge')
//     await expect(cartBadge)

// })