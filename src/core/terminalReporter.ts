import type {FullConfig,FullResult,Reporter,TestCase,TestResult} from '@playwright/test/reporter';
import {terminalLog} from './terminalLog';
export default class TerminalReporter implements Reporter {
  onBegin(_config:FullConfig,suite:{allTests():TestCase[]}):void{terminalLog('Running '+suite.allTests().length+' test(s)');}
  onTestEnd(test:TestCase,result:TestResult):void{terminalLog(result.status.toUpperCase()+' '+test.titlePath().join(' > '));}
  onEnd(result:FullResult):void{terminalLog('Finished: '+result.status);}
}
