import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { EmployeesPage } from "../Pages/employeepage";
import { AddEmployeePage } from "../Pages/addemployeepage";

test.describe("Add Employee Test Cases", () => {

  let addEmployeePage: AddEmployeePage;

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const employeesPage = new EmployeesPage(page);
    addEmployeePage = new AddEmployeePage(page);

    // Step 1 - Login
    await page.goto(String(process.env.BASE_URL));;
    await loginPage.login(
      'akhilr@xminds.com',
      '@Dm!n**4455'
    );

    // Step 2 - Navigate to Add Employee page
    await page.getByRole('link', { name: 'Employees' }).click();
    await employeesPage.clickAddEmployee();

    // Optional verification
    await addEmployeePage.verifyAddEmployeePageLoaded();
  });

  test("Create employee with valid data", async () => {

    await addEmployeePage.createEmployee(
      "Jobin",
      "jobin@xminds.com",
      "Password@123",
      "Employee"
    );

  });
  

  test("Validation when e-mail format is wrong", async () => {
   await addEmployeePage.createEmployee("maneesh", "maneesh", "Password");
   const validationMessage = await addEmployeePage.email.evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );
  await expect(validationMessage)
    .toContain("Please include an '@'");
});

});