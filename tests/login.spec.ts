import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("All testcases to Verify Login page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.base_url));
  });

  test("Error showing whenever username and password wrong", async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login('rahulshetty@academy.com', 'learning');
     const errorMessage = page.locator('text=Invalid credentials.');
  await expect(errorMessage).toBeVisible();

  });
test('Login with valid email & invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('akhilr@xminds.com', 'learning');
  await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
  test('Login with empty username', async ({ page }) => {
 const loginPage = new LoginPage(page);
  await loginPage.login('', '');
  await expect(loginPage.usernameTextbox).toHaveJSProperty('validationMessage', 'Please fill out this field.');
});
 test("Login with correct username and password", async ({ page }) => {
 const loginPage = new LoginPage(page);
  await loginPage.login(process.env.NAME!, process.env.PASSWORD!);
  await expect(page).toHaveURL ('https://xtime-5f7.xminds.in/admin/dashboard');
});
});



   
