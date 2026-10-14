import type { Page } from '@playwright/test';
export class AdminElements {
  readonly addButton; readonly saveButton; readonly searchButton;
  constructor(private readonly page: Page) {
    // OrangeHRM includes the button icon in its accessible name (for example, "ï“¾ Add").
    // Match the visible action text without requiring an exact accessible-name match.
    this.addButton=page.getByRole('button',{name:/Add/});
    this.saveButton=page.getByRole('button',{name:'Save',exact:true});
    this.searchButton=page.getByRole('button',{name:'Search',exact:true});
  }
  field(label:string){return this.page.locator('.oxd-input-group').filter({has:this.page.getByText(label,{exact:true})}).getByRole('textbox');}
  password(label:string){return this.page.locator('.oxd-input-group').filter({has:this.page.getByText(label,{exact:true})}).locator('input[type="password"]');}
  select(label:string){return this.page.locator('.oxd-input-group').filter({has:this.page.getByText(label,{exact:true})}).locator('.oxd-select-text');}
  rows(){return this.page.getByRole('row');}
}
