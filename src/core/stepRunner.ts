export type StepRunner = <T>(title: string, body: () => Promise<T>) => Promise<T>;
