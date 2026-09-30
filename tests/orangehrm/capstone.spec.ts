import { test } from '../../src/fixtures/authenticated';
import { OrangeHrmCleanup } from './support/cleanup';
import { createEmployeeData } from './support/testData';

test('capstone: creates, finds, and removes a synthetic employee', async ({ authenticatedOrangeHrm: hrm }, testInfo) => {
  const employee = createEmployeeData();
  const employeeName = `${employee.firstName} ${employee.lastName}`;
  const cleanup = new OrangeHrmCleanup();

  let employeeRemoved = false;
  try {
    await test.step('Create a uniquely named synthetic employee', async () => {
      await hrm.goTo('PIM');
      await hrm.addEmployee(employee);
    });

    await test.step('Find the employee in the active employee list', async () => {
      await hrm.goTo('PIM');
      await hrm.findEmployee(employeeName);
    });

    await test.step('Remove the synthetic employee and verify it is absent', async () => {
      await hrm.deleteEmployee(employeeName);
      employeeRemoved = true;
    });
  } finally {
    // Best-effort cleanup also covers failures before the explicit removal step.
    await cleanup.restoreAdminSession(hrm);
    if (employeeRemoved) cleanup.notNeeded('employee already removed and absence asserted in scenario');
    else await cleanup.employee(hrm, employeeName);
    await testInfo.attach('cleanup-record.json', {
      body: JSON.stringify({ testDataId: employeeName, outcomes: cleanup.summary() }, null, 2),
      contentType: 'application/json'
    });
  }
});
