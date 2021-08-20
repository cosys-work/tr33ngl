import { flatten2, Functorial, isMappable } from "@cosys/func";

export type Ts<T> = T[];

export interface Mappable<T> {
  map: <U>(func: (value: T, index?: number, values?: Ts<T>) => U) => Ts<U>;
  length: number;
}

export interface FuncMappable<T> {
  map: <U>(func: Functorial<(value: T) => U>) => Ts<U>;
}

export interface MonadMappable<T> {
  map: <U>(func: (val: T) => Functorial<U>) => Ts<U>;
}

export class Mapper<T> implements Mappable<T> {
  readonly value!: T;
  readonly length!: number;

  constructor(v: T) {
    this.value = v;
    this.length = isMappable(v) ? v.length : 1;
  }

  map<U>(func: (value: T, index?: number, values?: Ts<T>) => U) : Ts<U> {
    if (isMappable<T>(this.value)) {
      return this.value.map(func);
    } else {
      return [this.value].map(func);
    }
  }
}

export class FuncMapper<T> implements FuncMappable<T> {

  readonly val!: Ts<T>;

  constructor(v: Ts<T>) {
    this.val = v;
  }

  map<U>(func: Functorial<(value: T) => U>): Ts<U> {
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

  map<U>(func: (val: T) => Functorial<U>): Ts<U> {
    const valMapFunc: Ts<Functorial<U>>  = this.val.map(func);
    const valMapFuncMap: Ts<Ts<U>> = valMapFunc.map(((mu: Functorial<U>) => mu.extract().map(v => v)));
    return flatten2<U>(valMapFuncMap);
  }
}
