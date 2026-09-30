import type {OrangeHrmSteps} from '../../../src/sites/orangehrm/steps/orangeHrmSteps';
import {terminalLog} from '../../../src/core/terminalLog';

export class OrangeHrmCleanup {
  private readonly outcomes:{action:string;result:'CLEANUP-PASSED'|'CLEANUP-FAILED'|'CLEANUP-NOT-NEEDED'}[]=[];
  private async attempt(label:string,action:()=>Promise<void>):Promise<void>{
    try {await action();this.outcomes.push({action:label,result:'CLEANUP-PASSED'});}
    catch {this.outcomes.push({action:label,result:'CLEANUP-FAILED'});terminalLog('Best-effort cleanup could not complete: '+label);}
  }
  notNeeded(label:string):void{this.outcomes.push({action:label,result:'CLEANUP-NOT-NEEDED'});}
  summary(){return [...this.outcomes];}
  async restoreAdminSession(hrm:OrangeHrmSteps):Promise<void>{
    await this.attempt('restore admin session',async()=>{
      const username=process.env.E2E_USERNAME;const password=process.env.E2E_PASSWORD;
      if(!username||!password) throw new Error('missing admin credentials');
      await hrm.logout().catch(()=>undefined);
      await hrm.openLogin();await hrm.login(username,password);await hrm.expectDashboard();
    });
  }
  async essUser(hrm:OrangeHrmSteps,username:string):Promise<void>{
    await this.attempt('delete generated ESS user',async()=>{
      await hrm.goTo('Admin');await hrm.goTo('User Management');await hrm.deleteUser(username);
    });
  }
  async leaveRequest(hrm:OrangeHrmSteps,employeeName:string):Promise<void>{
    await this.attempt('cancel generated leave request',async()=>{
      await hrm.goTo('Leave');await hrm.goTo('Leave List');await hrm.findLeave(employeeName);await hrm.cancelLeave(employeeName);
    });
  }
  async leaveEntitlement(hrm:OrangeHrmSteps,employeeName:string,leaveType:string):Promise<void>{
    await this.attempt('delete generated leave entitlement',async()=>{
      await hrm.goTo('Leave');await hrm.goTo('Entitlements');await hrm.goTo('Employee Entitlements');
      await hrm.deleteLeaveEntitlement(employeeName,leaveType);
    });
  }
  async employee(hrm:OrangeHrmSteps,employeeName:string):Promise<void>{
    await this.attempt('delete generated employee',async()=>{
      await hrm.goTo('PIM');await hrm.deleteEmployee(employeeName);
    });
  }
}


