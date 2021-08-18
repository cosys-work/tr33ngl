import { LeftNominator as Leftness, RightNominator as Rightness, is, nominate, TValued, Monad } from "@cosys/func";

export function left<T>(v: T): Leftness<T> {
  return nominate("Left", v) as Leftness<T>;
}

export function isLeft<T>(v: TValued<T>): v is Leftness<T> {
  return is<Leftness<T>>(v, left(v.value));
}

export class Left<T> extends Monad<T> implements Leftness<T> {
  readonly type: "Left" = "Left";
  readonly value!: T;

  constructor(value: T) {
    super(left(value).value);
    this.value = { ...super.value, ...{ type: this.type, value: value } };
  }

}

export function right<T>(v: T): Rightness<T> {
  return nominate("Right", v) as Rightness<T>;
}

export function isRight<T>(v: TValued<T>): v is Rightness<T> {
  return is<Rightness<T>>(v, right(v.value));
}

export class Right<T> extends Monad<T> implements Rightness<T> {
  readonly type: "Right" = "Right";
  readonly value!: T;

  constructor(value: T) {
    super(right(value).value);
    this.value = { ...super.value, ...{ type: this.type, value: value } };
  }
}

export type Eitherness<L, R> = Leftness<L> | Rightness<R>;

export function eitherLElseR<L, R>(l: L, r: R): Eitherness<L, R> {
  return r !== undefined && r !== null
    ? right(r)
    : left(l);
}

export class Either<L, R> extends Monad<Eitherness<L, R>> {
  constructor(l: L, r: R) {
    super(eitherLElseR(l, r));
  }
}
