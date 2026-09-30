import type { EmployeeInput } from '../../../src/sites/orangehrm/pages/pimPage';
const suffix=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
export function createEmployeeData():EmployeeInput{
  const id=suffix();
  return {firstName:'E2E-PMLM-'+id,lastName:'Employee'};
}
export function createEssUserData(){return {username:'E2E-PMLM-'+suffix(),password:'E2ePmlm!'+suffix()};}
export function nextWeekdayDate(offset=1):string{
  const date=new Date();date.setDate(date.getDate()+offset);
  while(date.getDay()===0||date.getDay()===6) date.setDate(date.getDate()+1);
  return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
}
