import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { TaskPage } from "../Pages/TaskPage";

test.describe("Task Page Test Cases", () => {

  test.beforeEach(async ({ page }) => {
    const employee = new TaskPage(page);
    const login = new LoginPage(page);
    await page.goto(String(process.env.BASE_URL));
    await login.login(process.env.NAME!, process.env.PASSWORD!);
    await page.locator('a').filter({ hasText: 'Tasks' }).first().click();
  });

  test("Verify Employees page loads successfully", async ({ page }) => {
    const task = new TaskPage(page);
    await expect(task.searchInput).toBeVisible();
    await expect(task.searchButton).toBeVisible();
    await expect(task.addTaskButton).toBeVisible();
  });

  test("Search task by name", async ({ page }) => {
    const task = new TaskPage(page);
     await task.searchTask("Testtask10");
     const table = page.locator("table.w-full.border-collapse.border-gray-300");
    await expect(table).toContainText("Testtask10");
});


  test("task by employee name", async ({ page }) => {
     const task = new TaskPage(page);
     await task.searchTask("Simi");
     const table = page.locator("table.w-full.border-collapse.border-gray-300");
    await expect(table).toContainText("Simi");
});

  test("Search with no results", async ({ page }) => {
    const task = new TaskPage(page);
    await task.searchTask("");
    await expect(page.getByText("No tasks found.")).toBeVisible();
  });

  test("Verify pagination navigation", async ({ page }) => {
    const task = new TaskPage(page);
    await page.getByRole('link', { name: 'Go to page 2' }).click();
    await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/tasks?page=2");
});

  test("Verify next pagination button", async ({ page }) => {
    const task = new TaskPage(page);
    await page.getByRole('link', { name: 'Next &raquo;' }).click();
     await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/tasks?page=2");
  });

  test("Verify Add New Employee navigation", async ({ page }) => {
    const task = new TaskPage(page);
     await task.clickTask();
     await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/tasks/create");
  });

  test("Verify View Tasks navigation", async ({ page }) => {
     const task = new TaskPage(page);
    await page.locator('a[href*="/tasks/191"]').click();
    await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/tasks/191");
  });

});