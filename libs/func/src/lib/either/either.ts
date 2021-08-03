import { LeftNominator as Leftness, RightNominator as Rightness } from "./nominator";
import { is, nominate, TValued } from "../nominators";
import { Monad } from "../monad/monad";


export { LeftNominator as Leftness, RightNominator as Rightness } from "./nominator";

export function left<T>(v: T): Leftness<T> {
  return nominate("Left", v) as Leftness<T>;
}

export function isLeft<T>(v: TValued<T>): v is Leftness<T> {
  return is<Leftness<T>>(v, left(v.value));
}

export class Left<T> extends Monad<Leftness<T>> implements Leftness<T> {
  type: "Left" = "Left";
  value!: T & Leftness<T>;

  constructor(value: T) {
    super(left(value));
    this.value = { ...super.value.value, ...{ type: this.type, value: value } };
  }

}


export function right<T>(v: T): Rightness<T> {
  return nominate("Right", v) as Rightness<T>;
}

export function isRight<T>(v: TValued<T>): v is Rightness<T> {
  return is<Rightness<T>>(v, right(v.value));
}

export class Right<T> extends Monad<Rightness<T>> implements Rightness<T> {
  readonly type: "Right";
  value!: T & Rightness<T>;

  constructor(value: T) {
    super(right(value));
    this.value = { ...super.value.value, ...{ type: this.type, value: value } };
  }
}

export type Eitherness<L, R> = Leftness<L> | Rightness<R>;

export function eitherLElseR<L, R>(l: L, r: R): Eitherness<L, R> {
  return l !== undefined && l !== null
    ? left(l)
    : right(r);
}

export class Either<L, R> extends Monad<Eitherness<L, R>> {
  constructor(l: L, r: R) {
    super(eitherLElseR(l, r));
  }
}
