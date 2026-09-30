import type { Page } from '@playwright/test';
export class DirectoryElements {
  constructor(private readonly page:Page){}
  get employeeName(){return this.page.getByPlaceholder('Type for hints...');}
  get searchButton(){return this.page.getByRole('button',{name:'Search',exact:true});}
  get cards(){return this.page.locator('.orangehrm-directory-card');}
}
