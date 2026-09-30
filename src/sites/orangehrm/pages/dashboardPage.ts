import { expect, type Page } from '@playwright/test';
import { BasePage } from '../../../core/basePage';
import { DashboardElements } from '../elements/dashboardElements';
export class DashboardPage extends BasePage {
  private readonly elements: DashboardElements;
  constructor(page: Page) { super(page); this.elements = new DashboardElements(page); }
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\/index/);
    await this.expectVisible(this.elements.heading);
  }
}
