import type { Page } from '@playwright/test';
export class PimElements {
  readonly addButton; readonly firstName; readonly middleName; readonly lastName; readonly saveButton;
  constructor(private readonly page:Page) {
    this.addButton=page.getByRole('button',{name:'Add',exact:true});
    this.firstName=page.getByRole('textbox',{name:'First Name'});
    this.middleName=page.getByRole('textbox',{name:'Middle Name'});
    this.lastName=page.getByRole('textbox',{name:'Last Name'});
    this.saveButton=page.getByRole('button',{name:'Save',exact:true});
  }
  employeeRows(){return this.page.getByRole('row');}
}
