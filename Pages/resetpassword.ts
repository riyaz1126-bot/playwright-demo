import { Page, Locator } from "@playwright/test";

export class ResetPassword {
  readonly page: Page;
  readonly currentPassword: Locator;
  readonly newPassword: Locator;
  readonly confirmPassword: Locator;
  readonly updatePasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Adjust selectors to match your actual DOM
    this.currentPassword = page.locator('[name="current_password"]');
    this.newPassword = page.locator('[name="password"]');
    this.confirmPassword = page.locator('[name="password_confirmation"]');
    this.updatePasswordButton = page.getByRole('button', { name: 'Update Password' });
  }

  async resetPassword(current: string, newPass: string, confirmPass: string) {
    await this.currentPassword.fill(current);
    await this.newPassword.fill(newPass);
    await this.confirmPassword.fill(confirmPass);
    await this.updatePasswordButton.click();
  }
}
