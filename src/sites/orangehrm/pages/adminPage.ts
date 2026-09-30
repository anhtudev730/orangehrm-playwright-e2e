import {expect,type Page} from '@playwright/test';
import {BasePage} from '../../../core/basePage';
import {AdminElements} from '../elements/adminElements';
import {ConfirmationPage} from './confirmationPage';
export type EssUserInput={username:string;employeeName:string;password:string};
export class AdminPage extends BasePage {
  private readonly e:AdminElements;
  private readonly confirmation:ConfirmationPage;
  constructor(page:Page){super(page);this.e=new AdminElements(page);this.confirmation=new ConfirmationPage(page);}
  async createEssUser(user:EssUserInput):Promise<void>{
    await this.click(this.e.addButton);
    await this.selectOption('User Role','ESS');
    await this.fill(this.e.field('Employee Name'),user.employeeName);
    const employeeOption=this.page.getByRole('option',{name:new RegExp(user.employeeName,'i')});
    await expect(employeeOption).toHaveCount(1);
    await employeeOption.click();
    await this.selectOption('Status','Enabled');
    await this.fill(this.e.field('Username'),user.username);
    await this.fill(this.e.password('Password'),user.password);
    await this.fill(this.e.password('Confirm Password'),user.password);
    await this.click(this.e.saveButton);
    await expect(this.page.getByRole('heading',{name:'System Users'})).toBeVisible();
  }
  async expectUserFound(username:string):Promise<void>{
    await this.fill(this.e.field('Username'),username);await this.click(this.e.searchButton);
    const row=this.e.rows().filter({hasText:username});
    await expect(row).toHaveCount(1);
    await expect(row).toBeVisible();
  }
  async deleteUser(username:string):Promise<void>{
    await this.fill(this.e.field('Username'),username);await this.click(this.e.searchButton);
    const row=this.e.rows().filter({hasText:username});
    await expect(row).toHaveCount(1);
    await expect(row).toBeVisible();
    const deleteAction=row.getByRole('button',{name:'Delete',exact:true});
    await expect(deleteAction).toHaveCount(1);
    await deleteAction.click();
    await this.confirmation.confirm(/Yes, Delete/i);
    await expect(this.e.rows().filter({hasText:username})).toHaveCount(0);
  }
  private async selectOption(label:string,value:string):Promise<void>{
    await this.click(this.e.select(label));await this.page.getByRole('option',{name:value,exact:true}).click();
  }
  async expectAdminMenuHidden():Promise<void>{await expect(this.page.getByRole('link',{name:'Admin',exact:true})).toHaveCount(0);}
}
