import { expect, type Locator, type Page } from '@playwright/test';
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}
  protected async click(locator: Locator): Promise<void> { await expect(locator).toBeVisible(); await locator.click(); }
  protected async fill(locator: Locator, value: string): Promise<void> { await expect(locator).toBeVisible(); await locator.fill(value); }
  protected async expectVisible(locator: Locator): Promise<void> { await expect(locator).toBeVisible(); }
}
