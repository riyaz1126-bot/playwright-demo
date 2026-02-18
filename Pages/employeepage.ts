import { Page, Locator, expect } from "@playwright/test";

export class EmployeesPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly addEmployeeButton: Locator;
  readonly tableRows: Locator;
  readonly paginationNumbers: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search by name or email...', { exact: true });
    this.searchButton = page.locator('button:has-text("Search")'); 
    this.addEmployeeButton = page.getByRole('link', { name: '+ Add New Employee' });
    this.tableRows = page.locator("//table[@class='w-full border-collapse border-gray-300']");
    this.paginationNumbers = page.locator('span').filter({ hasText: '2' }).last();
    this.nextButton = page.locator("button:has-text('>')");
    this.prevButton = page.locator("button:has-text('<')");
    this.usernameTextbox = page.locator('[name="email"]'); 
    this.passwordTextbox = page.locator('[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async searchEmployee(value: string) {
    await this.searchInput.fill(value);
    await this.searchButton.click();
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async clickViewTasksByName(name: string) {
    await this.page
      .locator("tr", { hasText: name })
      .getByText("View Tasks")
      .click();
  }

  async clickPagination(pageNumber: string) {
    await this.page.getByRole("button", { name: pageNumber }).click();
  }

  async verifyTableHasData() {
    await expect(this.tableRows.first()).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

}