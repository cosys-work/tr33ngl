import {
  AlphaMonad,
  EitherNom,
  is,
  LeftNominator,
  Monad,
  Monadic,
  nominate,
  RightNominator,
  TValued
} from "@cosys/func";

export function left<T>(v: T): LeftNominator<T> {
  return nominate("Either~Left", v) as LeftNominator<T>;
}

export function isLeft<T>(v: TValued<T>): v is LeftNominator<T> {
  return is<LeftNominator<T>>(v, left(v.value));
}

export function right<T>(v: T): RightNominator<T> {
  return nominate("Right", v) as RightNominator<T>;
}

export function isRight<T>(v: TValued<T>): v is RightNominator<T> {
  return is<RightNominator<T>>(v, right(v.value));
}

export class Left<T> extends AlphaMonad<LeftNominator<T>> implements Monadic<LeftNominator<T>>, LeftNominator<T> {
  readonly type = EitherNom.Left;
  readonly value!: T & LeftNominator<T>;

  constructor(value: T) {
    super(left(value));
    this.value = { ...left(value), ...value };
  }
}

export class Right<T> extends AlphaMonad<RightNominator<T>> implements Monadic<RightNominator<T>>, RightNominator<T> {

  readonly type = EitherNom.Right;
  readonly value!: T & RightNominator<T>;

  constructor(value: T) {
    super(right(value));
    this.value = { ...right(value), ...value };
  }
}

export type Eitherness<L, R> = LeftNominator<L> | RightNominator<R>;

export function eitherLElseR<L, R>(l: L, r: R): Eitherness<L, R> {
  try {
    const rIsNullish = r === null || r === undefined;
    return rIsNullish ? left(l) : right(r);
  } catch (err) {
    return left(err);
  }
}

export class Either<L, R> extends Monad<Eitherness<L, R>> {

  type: EitherNom.Left | EitherNom.Right;

  constructor(l: L, r: R) {
    super(eitherLElseR(l, r));
  }
}
