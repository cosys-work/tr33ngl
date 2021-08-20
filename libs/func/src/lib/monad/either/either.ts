import { AlphaMonad, EitherNom, left, LeftNominator, Monad, Monadic, right, RightNominator } from "@cosys/func";

export class Right<T>
  extends AlphaMonad<RightNominator<T>>
  implements Monadic<RightNominator<T>> {
  readonly value!: T & RightNominator<T>;
  constructor(value: T) {
    super(right(value));
    this.value = { ...right(value), ...value };
  }
}

export class Left<T>
  extends AlphaMonad<LeftNominator<T>>
  implements Monadic<LeftNominator<T>> {
  readonly value!: T & LeftNominator<T>;
  constructor(value: T) {
    super(left(value));
    this.value = { ...left(value), ...value };
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
