import { expect,type Page } from '@playwright/test';
import { BasePage } from '../../../core/basePage';
import { DirectoryElements } from '../elements/directoryElements';
export class DirectoryPage extends BasePage {
  private readonly e:DirectoryElements;
  constructor(page:Page){super(page);this.e=new DirectoryElements(page);}
  async searchEmployee(name:string):Promise<void>{
    await this.fill(this.e.employeeName,name);
    const option=this.page.getByRole('option',{name:new RegExp(name,'i')});
    await expect(option).toHaveCount(1);
    await option.click();
    await this.click(this.e.searchButton);
    const card=this.e.cards.filter({hasText:name});
    await expect(card).toHaveCount(1);
    await expect(card).toBeVisible();
  }
}
