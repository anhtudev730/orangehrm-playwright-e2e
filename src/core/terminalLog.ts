const SENSITIVE_ASSIGNMENT = /(password|passwd|token|secret)(\s*[:=]\s*)([^\s,;]+)/gi;
export function redact(value: string): string { return value.replace(SENSITIVE_ASSIGNMENT, '$1$2[REDACTED]'); }
export function terminalLog(message: string): void { console.log(redact(message)); }
