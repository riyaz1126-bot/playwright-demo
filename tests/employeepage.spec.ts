import { test, expect } from "@playwright/test";
import { EmployeesPage } from "../Pages/employeepage";
import { url } from "node:inspector";

test.describe("Employees Page Test Cases", () => {

  test.beforeEach(async ({ page }) => {
    const employee = new EmployeesPage(page);
    await page.goto(String(process.env.BASE_URL));
    await employee.login(process.env.NAME!, process.env.PASSWORD!);
    await page.getByRole('link', { name: 'Employees' }).click();
  });

  test("Verify Employees page loads successfully", async ({ page }) => {
    const employees = new EmployeesPage(page);
    await expect(employees.searchInput).toBeVisible();
    await expect(employees.searchButton).toBeVisible();
    await expect(employees.addEmployeeButton).toBeVisible();
  });

  test("Search employee by name", async ({ page }) => {
    const employees = new EmployeesPage(page);
     await employees.searchEmployee("nate");
     const table = page.locator("table.w-full.border-collapse.border-gray-300");
    await expect(table).toContainText("nate");
});


  test("Search employee by email", async ({ page }) => {
    const employees = new EmployeesPage(page);
     await employees.searchEmployee("testuser1@xminds.com");
     const table = page.locator("table.w-full.border-collapse.border-gray-300");
    await expect(table).toContainText("testuser1@xminds.com");
});

  test("Search with no results", async ({ page }) => {
    const employees = new EmployeesPage(page);
    await employees.searchEmployee("NoUser123");
    await expect(page.getByText("No employees found.")).toBeVisible();
  });

  test("Verify pagination navigation", async ({ page }) => {
    const employees = new EmployeesPage(page);
    await page.getByRole('link', { name: 'Go to page 2' }).click();
    await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/employees?page=2");
});

  test("Verify next pagination button", async ({ page }) => {
    const employees = new EmployeesPage(page);
    await page.getByRole('link', { name: 'Next &raquo;' }).click();
     await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/employees?page=2");
  });

  test("Verify Add New Employee navigation", async ({ page }) => {
    const employees = new EmployeesPage(page);
     await employees.clickAddEmployee();
     await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/employees/create");
  });

  test("Verify View Tasks navigation", async ({ page }) => {
    const employees = new EmployeesPage(page);
      await page.getByRole('link', { name: 'View Tasks' }).first().click();;
    await expect(page).toHaveURL("https://xtime-5f7.xminds.in/admin/employees/164/tasks");
  });

});