import { is, nominate, TValued } from "../nominators";

import { JustNominator as Justness, NothingNominator as Nothingness } from "./nominator";
import { Monad } from "../monad/monad";


export function nothing(): Nothingness {
  return nominate("Nothing", "Nothing") as Nothingness;
}

export function isNothing(v: TValued<unknown>): v is Nothingness {
  return is<Nothingness>(v, nothing());
}

export class Nothing extends Monad<undefined> implements Nothingness {
  readonly type: string = "Nothing";
  readonly value!: undefined;

  constructor() {
    super(undefined);
  }
}

export function just<T>(v: T): Justness<T> {
  return nominate("Just", v) as Justness<T>;
}

export function isJust<T>(v: TValued<T>): v is Justness<T> {
  return is<Justness<T>>(v, just(v.value));
}

export class Just<T> extends Monad<Justness<T>> implements Justness<T> {
  readonly type: "Just" = "Just";
  readonly value!: T & Justness<T>;

  constructor(value: T) {
    super(just(value));
    this.value = { ...super.value.value, ...{ value: value, type: this.type} };
  }
}


export type Maybeness<T> = Justness<T> | Nothingness;

export function maybe<T>(t: T): Maybeness<T> {
  return t === undefined || t === null
    ? nothing()
    : just<T>(t);
}

export class Maybe<T> extends Monad<Maybeness<T>> {
  constructor(value: T) {
    super(maybe(value));
  }
}
