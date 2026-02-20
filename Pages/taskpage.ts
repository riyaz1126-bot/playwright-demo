import { Page, Locator, expect } from "@playwright/test";

export class TaskPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly addTaskButton: Locator;
  readonly tableRows: Locator;
  readonly paginationNumbers: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search tasks...' });
    this.searchButton= page.getByRole('button', { name: 'Search' });
    this.addTaskButton = page.getByRole('link', { name: '+ Add New Task' });
    this.tableRows = page.locator("//table[@class='w-full border-collapse border-gray-300']");
    this.paginationNumbers = page.locator('span').filter({ hasText: '2' }).last();
    this.nextButton = page.locator("button:has-text('>')");
    this.prevButton = page.locator("button:has-text('<')");
  }

  async searchTask(value: string) {
    await this.searchInput.fill(value);
    await this.searchButton.click();
  }

  async clickTask() {
    await this.addTaskButton.click();
  }

}