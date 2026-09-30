import type { Page } from '@playwright/test';
export class DashboardElements {
  readonly heading;
  constructor(page: Page) { this.heading = page.getByRole('heading', { name: 'Dashboard' }); }
}
