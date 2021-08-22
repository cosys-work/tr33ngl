export type Func<T, U> = (value: T, index: number, values: T[]) => U;
export const idFunc: Func<unknown, unknown[]> = (t) => new Array(1).fill(t);
