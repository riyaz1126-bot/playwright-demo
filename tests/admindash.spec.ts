import { test, expect } from "@playwright/test";
import { AdminDash } from "../Pages/admindash";

test.describe("All testcases to Verify menu", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.BASE_URL));
  });

  test("All menu items", async ({ page }) => {
    const adminDash = new AdminDash(page);
    await adminDash.login(process.env.NAME!, process.env.PASSWORD!);

    await expect(page.locator('a').filter({ hasText: 'Home' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Employees' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Tasks' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Timesheet' }).first()).toBeVisible();
  });

  test("All dashboard widgets", async ({ page }) => {
    const adminDash = new AdminDash(page);
    await adminDash.login(process.env.NAME!, process.env.PASSWORD!);

    await expect(page.getByRole('heading', { name: 'Total Employees' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Total Tasks' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Completed Tasks' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'In Progress Tasks' })).toBeVisible();
  });
});

