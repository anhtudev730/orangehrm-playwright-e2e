import type {Page} from '@playwright/test';
import {BasePage} from '../../../core/basePage';
import {NavigationElements} from '../elements/navigationElements';
export class NavigationPage extends BasePage {
  private readonly elements:NavigationElements;
  constructor(page:Page){super(page);this.elements=new NavigationElements(page);}
  async goTo(section:string):Promise<void>{await this.click(this.elements.menu(section));}
  async logout():Promise<void>{
    await this.click(this.page.locator('.oxd-userdropdown-tab'));
    await this.page.getByRole('menuitem',{name:'Logout'}).click();
  }
}
