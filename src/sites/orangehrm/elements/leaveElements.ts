import type { Page } from '@playwright/test';
export class LeaveElements {
  constructor(private readonly page:Page){}
  field(label:string){return this.page.locator('.oxd-input-group').filter({has:this.page.getByText(label,{exact:true})}).getByRole('textbox');}
  select(label:string){return this.page.locator('.oxd-input-group').filter({has:this.page.getByText(label,{exact:true})}).locator('.oxd-select-text');}
  rows(){return this.page.getByRole('row');}
}
