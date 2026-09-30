import type {Page} from '@playwright/test';
export class LoginElements {
  readonly username;readonly password;readonly loginButton;readonly alert;
  constructor(page:Page){
    this.username=page.getByRole('textbox',{name:'Username'});
    this.password=page.locator('input[type=password]');
    this.loginButton=page.getByRole('button',{name:'Login'});
    this.alert=page.getByRole('alert');
  }
}
