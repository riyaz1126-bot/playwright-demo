import { Page, Locator, expect } from "@playwright/test";

export class StatusChange {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async changeTaskStatus(taskName: string, status: string) {
    const row = this.page.locator('tr.border-b', {
      has: this.page.getByRole('link', { name: taskName })
    });

    await row.locator('select').selectOption(status);
    await row.getByRole('button', { name: 'Update' }).click();
  }

  async verifyTaskStatus(taskName: string, expectedStatus: string) {
    const row = this.page.locator('tr.border-b', {
      has: this.page.getByRole('link', { name: taskName })
    });

    const statusCell = row.locator('td').nth(2);
    await expect(statusCell).toHaveText(expectedStatus);
  }
}


