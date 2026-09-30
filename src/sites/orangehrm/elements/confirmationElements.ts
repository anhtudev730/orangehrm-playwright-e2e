import type { Locator, Page } from '@playwright/test';

export class ConfirmationElements {
  constructor(private readonly page: Page) {}
  dialog(name?: string) {
    return name
      ? this.page.getByRole('dialog', { name, exact: true })
      : this.page.getByRole('dialog');
  }
  action(dialog: Locator, name: RegExp | string) {
    return dialog.getByRole('button', { name, exact: typeof name === 'string' });
  }
}
