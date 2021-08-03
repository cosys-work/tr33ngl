import { flatten2, Functorial, isMappable, Monadic } from "@cosys/func";

export type Ts<T> = T[];

export interface Mappable<T> {
  map: <U>(func: (value: T, index?: number, values?: T[]) => U) => U[];
}

export interface FuncMappable<T> {
  map: <U>(func: Functorial<(value: T) => U>) => U[];
}

export interface MonadMappable<T> {
  map: <U>(func: (val: T) => Monadic<U>) => U[];
}

export class Mapper<T> implements Mappable<T> {
  readonly val!: Ts<T>;

  constructor(v: Ts<T>) {
    this.val = v;
  }

  map<U>(func: (value: T, index?: number, values?: T[]) => U) : U[] {
    if (isMappable(this.val)) {
      return this.val.map(func);
    }
    return [func(this.val)];
  }
}

export class FuncMapper<T> implements FuncMappable<T> {

  readonly val!: Ts<T>;

  constructor(v: Ts<T>) {
    this.val = v;
  }

  map<U>(func: Functorial<(value: T) => U>): U[] {
    const funcs = func.extract().map((v) => v);
    if (funcs.length >= this.val.length) {
      return this.val.map((v, index) => funcs[index](v));
    } else {
      return this.val.map((v) => funcs[0](v));
    }
  }
}

export class MonadMapper<T> implements MonadMappable<T> {
  readonly val!: Ts<T>;

  constructor(v: Ts<T>) {
    this.val = v;
  }

  map<U>(func: (val: T) => Monadic<U>): U[] {
    const valMapFunc: Monadic<U>[]  = this.val.map(func);
    const valMapFuncMap: U[][] = valMapFunc.map(((mu: Monadic<U>) => mu.extract().map(v => v)));
    return flatten2<U>(valMapFuncMap);
  }
}
