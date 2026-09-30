import {test} from '../../src/fixtures/authenticated';
import {OrangeHrmCleanup} from './support/cleanup';
import {createEmployeeData,createEssUserData,nextWeekdayDate} from './support/testData';

test('creates, approves and cancels an ESS leave request with cleanup',async({authenticatedOrangeHrm:hrm})=>{
  const cleanup=new OrangeHrmCleanup();const employee=createEmployeeData();const user=createEssUserData();
  const name=employee.firstName+' '+employee.lastName;const type=process.env.E2E_LEAVE_TYPE??'US - Vacation';const date=nextWeekdayDate();
  try {
    await hrm.goTo('PIM');await hrm.addEmployee(employee);
    await hrm.goTo('Admin');await hrm.goTo('User Management');await hrm.createEssUser({...user,employeeName:name});
    await hrm.goTo('Leave');await hrm.goTo('Entitlements');await hrm.goTo('Add Entitlements');await hrm.addLeaveEntitlement(name,type,'1');
    await hrm.logout();await hrm.openLogin();await hrm.login(user.username,user.password);await hrm.expectDashboard();
    await hrm.goTo('Leave');await hrm.goTo('Apply');await hrm.applyLeave({leaveType:type,fromDate:date,toDate:date});
    await hrm.logout();await hrm.openLogin();await hrm.login(process.env.E2E_USERNAME!,process.env.E2E_PASSWORD!);await hrm.expectDashboard();
    await hrm.goTo('Leave');await hrm.goTo('Leave List');await hrm.findLeave(name);await hrm.approveLeave(name);await hrm.cancelLeave(name);
  } finally {
    await cleanup.restoreAdminSession(hrm);
    await cleanup.leaveRequest(hrm,name);
    await cleanup.essUser(hrm,user.username);
    await cleanup.leaveEntitlement(hrm,name,type);
    await cleanup.employee(hrm,name);
  }
});

