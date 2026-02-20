import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ResetPassword } from "../Pages/resetpassword";

test.describe("Reset password testcases", () => {
  let resetpass: ResetPassword;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    resetpass = new ResetPassword(page);

    await page.goto(String(process.env.BASE_URL));
    await loginPage.login(
      "jobin@xminds.com",
      "Password@345"
    );
    await page.getByRole("link", { name: "Password Reset" }).click();
  });

  test("password is updating correctly", async ({ page }) => {
    await resetpass.resetPassword(
      "Password@234",
      "Password@345",
      "Password@345"
    );

    // Example assertion
    await expect(page.getByText("Password updated successfully")).toBeVisible();
  });

  test("Warning shows whenever fields are empty", async ({ page }) => {
    await resetpass.resetPassword("", "", "");

    const validationMessage = await resetpass.currentPassword.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBe("Please fill out this field.");
  });

  test("Warning message shows whenever current password is wrong", async ({ page }) => {
    await resetpass.resetPassword(
      "Password@2345",
      "Password@456",
      "Password@456"
    );

    await expect(
      page.getByText("Current password is incorrect.", { exact: true })
    ).toBeVisible();
  });

  test("Warning message shows whenever new password and confirm password don't match", async ({ page }) => {
    await resetpass.resetPassword(
      "Password@345",
      "Password@890",
      "Password@823"
    );

    await expect(
      page.getByText("The password field confirmation does not match.", { exact: true })
    ).toBeVisible();
  });
});

