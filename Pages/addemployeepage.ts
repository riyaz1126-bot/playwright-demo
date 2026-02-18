import { Page, Locator, expect } from "@playwright/test";

export class AddEmployeePage {
  readonly page: Page;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly roleDropdown: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator('input[name="name"]');
    this.email = page.locator('input[name="email"]');
    this.password = page.locator('input[name="password"]');
    this.roleDropdown = page.locator('select[name="role"]');
    this.createButton = page.getByRole('button', { name: 'Create Employee' });
  }

  async createEmployee(name: string, email: string, password: string, role?: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.password.fill(password);

    if (role) {
      await this.roleDropdown.selectOption(role);
    }

    await this.createButton.click();
  }

  async verifyAddEmployeePageLoaded() {
    await expect(this.name).toBeVisible();
  }
}