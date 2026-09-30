import { expect, type Page } from '@playwright/test';
import { ConfirmationElements } from '../elements/confirmationElements';

export class ConfirmationPage {
  private readonly elements: ConfirmationElements;
  constructor(page: Page) { this.elements = new ConfirmationElements(page); }

  async confirm(buttonName: RegExp | string, dialogName?: string): Promise<void> {
    const dialog = this.elements.dialog(dialogName);
    await expect(dialog).toHaveCount(1);
    const action = this.elements.action(dialog, buttonName);
    await expect(action).toHaveCount(1);
    await action.click();
  }

  async confirmIfPresent(buttonName: RegExp | string): Promise<void> {
    const dialogs = this.elements.dialog();
    const count = await dialogs.count();
    if (count === 0) return;
    await expect(dialogs).toHaveCount(1);
    const action = this.elements.action(dialogs, buttonName);
    await expect(action).toHaveCount(1);
    await action.click();
  }
}
