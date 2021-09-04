import { AlphaMonad } from "../../alpha/monad";
import { left, LeftNominator, right, RightNominator } from "./either.nominator";
import { Monad, Monadic } from "@cosys/func";


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
    const rIsNullish = null === r || r === undefined;
    return rIsNullish ? left(l) : right(r);
  } catch (err: unknown) {
    return left(err as L);
  }
}

export class Either<L, R> extends Monad<Eitherness<L, R>> {
  readonly type!: string;
  constructor(l: L, r: R) {
    super(eitherLElseR(l, r));
    this.type = super.chomsky.type;
  }
}
