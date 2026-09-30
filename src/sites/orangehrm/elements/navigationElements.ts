import type { Page } from '@playwright/test';
export class NavigationElements {
  constructor(private readonly page: Page) {}
  menu(name: string) { return this.page.getByRole('link', { name, exact: true }); }
}
