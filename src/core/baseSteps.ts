import type { StepRunner } from './stepRunner';
export abstract class BaseSteps {
  protected constructor(private readonly runStep: StepRunner) {}
  protected step<T>(title: string, body: () => Promise<T>): Promise<T> { return this.runStep(title, body); }
}
