import {expect,type Page} from '@playwright/test';
import {BasePage} from '../../../core/basePage';
import {LeaveElements} from '../elements/leaveElements';
import {ConfirmationPage} from './confirmationPage';
export type LeaveApplication={leaveType:string;fromDate:string;toDate:string};
export class LeavePage extends BasePage {
  private readonly e:LeaveElements;
  private readonly confirmation:ConfirmationPage;
  constructor(page:Page){super(page);this.e=new LeaveElements(page);this.confirmation=new ConfirmationPage(page);}
  async addEntitlement(employeeName:string,leaveType:string,days:string):Promise<void>{
    await this.fill(this.e.field('Employee Name'),employeeName);
    const employeeOption=this.page.getByRole('option',{name:new RegExp(employeeName,'i')});
    await expect(employeeOption).toHaveCount(1);
    await employeeOption.click();
    await this.selectOption('Leave Type',leaveType);
    await this.fill(this.e.field('Entitlement'),days);
    await this.page.getByRole('button',{name:'Save',exact:true}).click();
    await this.confirmation.confirmIfPresent(/Confirm/i);
    await expect(this.page.getByText(/Successfully Saved/i)).toBeVisible();
  }
  async applyLeave(data:LeaveApplication):Promise<void>{
    await this.selectOption('Leave Type',data.leaveType);
    await this.fill(this.e.field('From Date'),data.fromDate);await this.fill(this.e.field('To Date'),data.toDate);
    await this.page.getByRole('button',{name:'Apply',exact:true}).click();
    await expect(this.page.getByText(/Successfully Saved|Leave Request/i)).toHaveCount(1);
    await expect(this.page.getByText(/Successfully Saved|Leave Request/i)).toBeVisible();
  }
  async findLeave(employeeName:string):Promise<void>{
    const field=this.e.field('Employee Name');await this.fill(field,employeeName);
    const option=this.page.getByRole('option',{name:new RegExp(employeeName,'i')});
    const optionCount=await option.count();
    if(optionCount===1) await option.click();
    else if(optionCount>1) throw new Error('Employee autocomplete was ambiguous.');
    await this.page.getByRole('button',{name:'Search',exact:true}).click();
    const row=this.e.rows().filter({hasText:employeeName});
    await expect(row).toHaveCount(1);
    await expect(row).toBeVisible();
  }
  async approveLeave(employeeName:string):Promise<void>{
    const row=this.e.rows().filter({hasText:employeeName});
    await expect(row).toHaveCount(1);
    await expect(row).toBeVisible();
    const approve=row.getByRole('button',{name:/Approve/i});
    await expect(approve).toHaveCount(1);
    await approve.click();
    await this.confirmation.confirmIfPresent(/Yes, Approve|Confirm/i);
    await expect(row).toContainText(/Approved|Scheduled/i);
  }
  async cancelLeave(employeeName:string):Promise<void>{
    const row=this.e.rows().filter({hasText:employeeName});
    const rowCount=await row.count();
    if(rowCount===0) return;
    await expect(row).toHaveCount(1);
    const cancel=row.getByRole('button',{name:/Cancel/i});
    await expect(cancel).toHaveCount(1);
    await cancel.click();
    await this.confirmation.confirmIfPresent(/Yes, Cancel|Confirm/i);
  }
  async deleteEntitlement(employeeName:string,leaveType:string):Promise<void>{
    const employee=this.e.field('Employee Name');
    if(await employee.count()){
      await employee.fill(employeeName);
      const option=this.page.getByRole('option',{name:new RegExp(employeeName,'i')});
      const optionCount=await option.count();
      if(optionCount===1) await option.click();
      else if(optionCount>1) throw new Error('Employee autocomplete was ambiguous.');
    }
    const type=this.e.select('Leave Type');
    if(await type.count()){await type.click();await this.page.getByRole('option',{name:leaveType,exact:true}).click();}
    const search=this.page.getByRole('button',{name:'Search',exact:true});if(await search.count()) await search.click();
    const row=this.e.rows().filter({hasText:employeeName}).filter({hasText:leaveType});
    const rowCount=await row.count();
    if(rowCount>1) throw new Error('Leave entitlement row was ambiguous.');
    if(rowCount===1){
      const deleteAction=row.getByRole('button',{name:'Delete',exact:true});
      await expect(deleteAction).toHaveCount(1);
      await deleteAction.click();
      await this.confirmation.confirmIfPresent(/Yes, Delete/i);
    }
  }
  private async selectOption(label:string,value:string):Promise<void>{
    await this.click(this.e.select(label));await this.page.getByRole('option',{name:value,exact:true}).click();
  }
}
