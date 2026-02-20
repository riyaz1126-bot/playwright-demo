import { Page, Locator } from '@playwright/test';

export class TaskCreation {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly userSearchBox: Locator;
  readonly createTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.locator('[name="title"]');
    this.descriptionInput = page.locator('[name="description"]');

    this.userSearchBox = page.getByRole('textbox', { name: 'Search user...' })

    this.createTaskButton = page.getByRole('button', {
      name: 'Create Task'
    });
  }

  // reusable dropdown selection
  async selectUser(userName: string) {
    await this.userSearchBox.fill(userName);

    const option = this.page.getByText(userName, { exact: true });
    await option.waitFor({ state: 'visible' });

    await option.click();
  }

  // main business action
  async createTask(
    title: string,
    description: string,
    userName: string
  ) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);

    await this.selectUser(userName);

    await this.createTaskButton.click();
  }
}