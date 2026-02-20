import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Timesheet testcases", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(String(process.env.base_url));
    await loginPage.login(process.env.NAME!, process.env.PASSWORD!);

    // Click Timesheet after login
    await page.getByRole('link', { name: 'Timesheet' }).click();
  });

  test("table only show selected user with monthly filter", async ({ page }) => {
    await page.locator('#filter-select').selectOption('monthly');
    await page.locator('span').filter({ hasText: 'All Employees' }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('jobin');
    await page.getByText('Jobin', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    const jobinSection = page.locator(
      'div.mb-6.border.rounded.p-4.bg-white',
      { hasText: "jobin@xminds.com" }
    );
    await expect(jobinSection).toBeVisible();
    await expect(jobinSection).toHaveCount(1);
  });

    test("table show selected employee with week filter", async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();
    const jobinSection = page.locator(
      'div.mb-6.border.rounded.p-4.bg-white',
      { hasText: "jobin@xminds.com"}
    );
    await expect(jobinSection).toBeVisible();
    await expect(jobinSection).toHaveCount(1);
  });
  test("table show all employees with week filter", async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    const jobinSection = page.locator(
      'div.mb-6.border.rounded.p-4.bg-white',
      { hasText: "jobin@xminds.com"}
    );
    const sukeshSection = page.locator(
      'div.mb-6.border.rounded.p-4.bg-white',
      { hasText: "sukesh@xminds.com"}
    );
    await expect(jobinSection).toBeVisible();
    await expect(jobinSection).toHaveCount(1);
    await expect(sukeshSection).toBeVisible();
    await expect(sukeshSection).toHaveCount(1);
  });
});