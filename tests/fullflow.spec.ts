import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { EmployeesPage } from "../Pages/employeepage";
import { AddEmployeePage } from "../Pages/addemployeepage";
import { StatusChange } from "../Pages/statusChange";
import { TaskCreation } from "../Pages/taskcreation";

test.describe("End-to-End Employee & Task Flow", () => {

  let loginPage;
  let employeesPage;
  let addEmployeePage;
  let taskCreation;
  let statusChange;

  const employeeName = `Ellis_${Date.now()}`;
  const employeeEmail = `ellis_${Date.now()}@xminds.com`;
  const employeePassword = "Password@123";
  const taskName = `Task_${Date.now()}`;

  test("Complete Employee & Task Flow", async ({ page }) => {

    // ---------- Initialize Pages ----------
    loginPage = new LoginPage(page);
    employeesPage = new EmployeesPage(page);
    addEmployeePage = new AddEmployeePage(page);
    taskCreation = new TaskCreation(page);
    statusChange = new StatusChange(page);

    // ---------- Admin Login ----------
    await page.goto(String(process.env.BASE_URL));
    await loginPage.login("akhilr@xminds.com", "@Dm!n**4455");

    // ---------- Create Employee ----------
    await page.getByRole("link", { name: "Employees" }).click();
    await employeesPage.clickAddEmployee();

    await addEmployeePage.createEmployee(
      employeeName,
      employeeEmail,
      employeePassword,
      "Employee"
    );

    // ---------- Create Task ----------
    await page.locator('a').filter({ hasText: 'Tasks' }).first().click();
    page.getByRole('link', { name: '+ Add New Task' }).click();
    await taskCreation.createTask(
      taskName,
      "Task description 10",
      employeeName
    );

    await page.getByRole("button", { name: "Logout" }).click();

    // ---------- Login as Employee ----------
    await loginPage.login(employeeEmail, employeePassword);

    // ---------- Change Status → In Progress ----------
    await statusChange.changeTaskStatus(taskName, "In Progress");
    await statusChange.verifyTaskStatus(taskName, "In Progress");

    // ---------- Change Status → Completed ----------
    await statusChange.changeTaskStatus(taskName, "Completed");
    await statusChange.verifyTaskStatus(taskName, "Completed");
  });

});