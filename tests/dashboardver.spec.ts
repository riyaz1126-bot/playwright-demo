import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Verify important locators are visible", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.BASE_URL));
    const loginPage = new LoginPage(page);   // ✅ Create object
    await loginPage.login(
      "jobin@xminds.com","Password@345"
    );
    
    // Add login or navigation steps here if needed
  });

  test("Navigation links are visible", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'My Task' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Timesheet' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Password Reset' })).toBeVisible();
  });

  test("Table headers are visible", async ({ page }) => {
    await expect(page.getByText('Title', { exact: true })).toBeVisible();
    await expect(page.getByText('Total Duration', { exact: true })).toBeVisible();
    await expect(page.getByText('Change Status', { exact: true })).toBeVisible();
    await expect(page.getByText('Created At', { exact: true })).toBeVisible();
  });
});
