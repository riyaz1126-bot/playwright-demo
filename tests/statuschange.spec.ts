import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { StatusChange } from "../Pages/statusChange";

test.describe("Task Status Change Test Cases", () => {
  let statusc: StatusChange;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    statusc = new StatusChange(page);

    await page.goto(String(process.env.BASE_URL));
    await loginPage.login(
      "jobin@xminds.com",
      "Password@345"
    );

    // Optional: Navigate to task page if needed
    // await page.getByRole('link', { name: 'Tasks' }).click();
  });

  test("Change task status to In Progress", async () => {
    const taskName = "Task 5";
    const newStatus = "In Progress";
    await statusc.changeTaskStatus(taskName, newStatus);
    await statusc.verifyTaskStatus(taskName, newStatus);
  });

  test("Change task status to Completed and verify", async () => {
    const taskName = "Task 5";
    const newStatus = "Completed";

    await statusc.changeTaskStatus(taskName, newStatus);

    await statusc.verifyTaskStatus(taskName, newStatus);
  });
});