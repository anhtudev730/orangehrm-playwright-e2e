import {expect,type Page} from '@playwright/test';
import {BasePage} from '../../../core/basePage';
import {LoginElements} from '../elements/loginElements';
export class LoginPage extends BasePage {
  private readonly elements:LoginElements;
  constructor(page:Page){super(page);this.elements=new LoginElements(page);}
  async open():Promise<void>{await this.page.goto('/web/index.php/auth/login');}
  async login(username:string,password:string):Promise<void>{
    await this.fill(this.elements.username,username);await this.fill(this.elements.password,password);await this.click(this.elements.loginButton);
  }
  async expectForm():Promise<void>{
    await this.expectVisible(this.elements.username);await this.expectVisible(this.elements.password);await this.expectVisible(this.elements.loginButton);
  }
  async expectInvalidCredentials():Promise<void>{
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.elements.username).toBeVisible();
    await expect(this.elements.loginButton).toBeVisible();
  }
}
