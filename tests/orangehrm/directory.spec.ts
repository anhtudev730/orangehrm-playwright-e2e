import {test} from '../../src/fixtures/authenticated';
import {OrangeHrmCleanup} from './support/cleanup';
import {createEmployeeData} from './support/testData';

test('finds a test employee in Directory and cleans it up',async({authenticatedOrangeHrm:hrm})=>{
  const cleanup=new OrangeHrmCleanup();const employee=createEmployeeData();const name=employee.firstName+' '+employee.lastName;
  try {await hrm.goTo('PIM');await hrm.addEmployee(employee);await hrm.goTo('Directory');await hrm.searchDirectory(name);}
  finally {await cleanup.restoreAdminSession(hrm);await cleanup.employee(hrm,name);}
});
