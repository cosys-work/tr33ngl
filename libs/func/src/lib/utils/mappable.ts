type Ts<T> = T[];

export interface Mappable<T> {
  id: () => Ts<T>;
  map: <U>(func: (value: T, index?: number, values?: Ts<T>) => U) => Ts<U>;
  length: number;
}


