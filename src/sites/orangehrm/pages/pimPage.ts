import { expect,type Page } from '@playwright/test';
import { BasePage } from '../../../core/basePage';
import { PimElements } from '../elements/pimElements';
import { ConfirmationPage } from './confirmationPage';
export type EmployeeInput={firstName:string;middleName?:string;lastName:string};
export class PimPage extends BasePage {
  private readonly e:PimElements;
  private readonly confirmation:ConfirmationPage;
  constructor(page:Page){super(page);this.e=new PimElements(page);this.confirmation=new ConfirmationPage(page);}
  async expectEmployeeList():Promise<void>{await expect(this.page.getByRole('heading',{name:'Employee Information'})).toBeVisible();}
  async addEmployee(employee:EmployeeInput):Promise<void>{
    await this.click(this.e.addButton);await this.fill(this.e.firstName,employee.firstName);
    await this.fill(this.e.middleName,employee.middleName??'');await this.fill(this.e.lastName,employee.lastName);
    await this.click(this.e.saveButton);
    await expect(this.page.getByRole('heading',{name:'Personal Details'})).toBeVisible();
  }
  async searchEmployee(name:string):Promise<void>{
    const group=this.page.locator('.oxd-input-group').filter({has:this.page.getByText('Employee Name',{exact:true})});
    await this.fill(group.getByRole('textbox'),name);
    const option=this.page.getByRole('option',{name:new RegExp(name,'i')});
    await expect(option).toHaveCount(1);
    await option.click();
    await this.page.getByRole('button',{name:'Search',exact:true}).click();
    const matchingRows=this.e.employeeRows().filter({hasText:name});
    await expect(matchingRows).toHaveCount(1);
    await expect(matchingRows).toBeVisible();
  }
  async deleteEmployee(name:string):Promise<void>{
    await this.searchEmployee(name);
    const row=this.e.employeeRows().filter({hasText:name});
    await expect(row).toHaveCount(1);
    const deleteAction=row.getByRole('button',{name:'Delete',exact:true});
    await expect(deleteAction).toHaveCount(1);
    await deleteAction.click();
    await this.confirmation.confirm(/Yes, Delete/i);
    await expect(this.e.employeeRows().filter({hasText:name})).toHaveCount(0);
  }
}
