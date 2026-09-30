import type {Page} from '@playwright/test';
import {BaseSteps} from '../../../core/baseSteps';
import type {StepRunner} from '../../../core/stepRunner';
import {AdminPage,type EssUserInput} from '../pages/adminPage';
import {DashboardPage} from '../pages/dashboardPage';
import {DirectoryPage} from '../pages/directoryPage';
import {LeavePage,type LeaveApplication} from '../pages/leavePage';
import {LoginPage} from '../pages/loginPage';
import {NavigationPage} from '../pages/navigationPage';
import {PimPage,type EmployeeInput} from '../pages/pimPage';
export class OrangeHrmSteps extends BaseSteps {
  private readonly admin:AdminPage;private readonly dashboard:DashboardPage;private readonly directory:DirectoryPage;
  private readonly leave:LeavePage;private readonly loginPage:LoginPage;private readonly navigation:NavigationPage;private readonly pim:PimPage;
  constructor(page:Page,runner:StepRunner){super(runner);this.admin=new AdminPage(page);this.dashboard=new DashboardPage(page);this.directory=new DirectoryPage(page);this.leave=new LeavePage(page);this.loginPage=new LoginPage(page);this.navigation=new NavigationPage(page);this.pim=new PimPage(page);}
  openLogin():Promise<void>{return this.step('Open login page',()=>this.loginPage.open());}
  expectLoginForm():Promise<void>{return this.step('Verify login form',()=>this.loginPage.expectForm());}
  login(user:string,password:string):Promise<void>{return this.step('Log in to OrangeHRM',()=>this.loginPage.login(user,password));}
  logout():Promise<void>{return this.step('Log out of OrangeHRM',()=>this.navigation.logout());}
  expectInvalidCredentials():Promise<void>{return this.step('Verify invalid credentials',()=>this.loginPage.expectInvalidCredentials());}
  expectDashboard():Promise<void>{return this.step('Verify dashboard',()=>this.dashboard.expectLoaded());}
  goTo(section:string):Promise<void>{return this.step('Open '+section,()=>this.navigation.goTo(section));}
  expectEmployeeList():Promise<void>{return this.step('Verify employee list',()=>this.pim.expectEmployeeList());}
  addEmployee(employee:EmployeeInput):Promise<void>{return this.step('Create employee '+employee.firstName,()=>this.pim.addEmployee(employee));}
  findEmployee(name:string):Promise<void>{return this.step('Find employee '+name,()=>this.pim.searchEmployee(name));}
  deleteEmployee(name:string):Promise<void>{return this.step('Delete test employee '+name,()=>this.pim.deleteEmployee(name));}
  createEssUser(user:EssUserInput):Promise<void>{return this.step('Create ESS user '+user.username,()=>this.admin.createEssUser(user));}
  findUser(username:string):Promise<void>{return this.step('Find user '+username,()=>this.admin.expectUserFound(username));}
  deleteUser(username:string):Promise<void>{return this.step('Delete test user '+username,()=>this.admin.deleteUser(username));}
  expectAdminMenuHidden():Promise<void>{return this.step('Verify ESS role cannot access Admin',()=>this.admin.expectAdminMenuHidden());}
  addLeaveEntitlement(name:string,type:string,days:string):Promise<void>{return this.step('Add leave entitlement for '+name,()=>this.leave.addEntitlement(name,type,days));}
  applyLeave(data:LeaveApplication):Promise<void>{return this.step('Apply leave',()=>this.leave.applyLeave(data));}
  findLeave(name:string):Promise<void>{return this.step('Find leave request for '+name,()=>this.leave.findLeave(name));}
  approveLeave(name:string):Promise<void>{return this.step('Approve leave for '+name,()=>this.leave.approveLeave(name));}
  cancelLeave(name:string):Promise<void>{return this.step('Cancel leave for '+name,()=>this.leave.cancelLeave(name));}
  deleteLeaveEntitlement(name:string,type:string):Promise<void>{return this.step('Delete test leave entitlement for '+name,()=>this.leave.deleteEntitlement(name,type));}
  searchDirectory(name:string):Promise<void>{return this.step('Search Directory for '+name,()=>this.directory.searchEmployee(name));}
}
