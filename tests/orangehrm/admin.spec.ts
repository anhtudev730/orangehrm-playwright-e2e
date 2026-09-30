import {test} from '../../src/fixtures/authenticated';
import {OrangeHrmCleanup} from './support/cleanup';
import {createEmployeeData,createEssUserData} from './support/testData';

test('creates, finds and removes an ESS user; ESS cannot access Admin',async({authenticatedOrangeHrm:hrm})=>{
  const cleanup=new OrangeHrmCleanup();const employee=createEmployeeData();const user=createEssUserData();
  const employeeName=employee.firstName+' '+employee.lastName;
  try {
    await hrm.goTo('PIM');await hrm.addEmployee(employee);
    await hrm.goTo('Admin');await hrm.goTo('User Management');
    await hrm.createEssUser({...user,employeeName});await hrm.findUser(user.username);
    await hrm.logout();await hrm.openLogin();await hrm.login(user.username,user.password);
    await hrm.expectDashboard();await hrm.expectAdminMenuHidden();
  } finally {
    await cleanup.restoreAdminSession(hrm);
    await cleanup.essUser(hrm,user.username);
    await cleanup.employee(hrm,employeeName);
  }
});
