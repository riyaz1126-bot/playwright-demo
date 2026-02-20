import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { TaskPage } from "../Pages/TaskPage";
import { TaskCreation } from "../Pages/taskcreation";

test.describe("Add Employee Test Cases", () => {
  let taskcreation: TaskCreation;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const taskpage = new TaskPage(page);
    taskcreation = new TaskCreation(page);

    await page.goto(String(process.env.BASE_URL));
    await loginPage.login(
      "akhilr@xminds.com",
      "@Dm!n**4455"
    );

    await page.getByRole("link", { name: "Tasks" }).click();
    await taskpage.clickTask();
  });

  test("Create task with valid data", async () => {
    await taskcreation.createTask(
      "New Task 12",
      "New description 12",
      "Testuser"
    );
  });

  test("Warning message shows when submitting with empty fields", async () => {
    await taskcreation.createTask("", "", "");
    await expect(taskcreation.titleInput).toHaveJSProperty(
      "validationMessage",
      "Please fill out this field."
    );
  });
});

