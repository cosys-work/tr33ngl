import { AlphaMonad, isNullish, just, JustNominator, Monad, Monadic, nothing, NothingNominator } from "@cosys/func";

export class Nothing
  extends AlphaMonad<NothingNominator<unknown>>
  implements Monadic<NothingNominator<unknown>> {
  constructor() {
    super(nothing());
  }
}

export class Just<T>
  extends AlphaMonad<JustNominator<T>>
  implements Monadic<JustNominator<T>> {
  readonly value!: T & JustNominator<T>;
  constructor(value: T) {
    super(just(value));
    this.value = { ...super.value, ...value};
  }
}


export type Maybeness<T> =
  Monadic<JustNominator<T>> |
  Monadic<NothingNominator<T>>;
export function maybe<T>(t: T): Maybeness<T> {
  return isNullish(t) ?
    new Monad(nothing()) :
    new Monad(just<T>(t));
}

export class Maybe<T>
  extends AlphaMonad<Maybeness<T>>
  implements Monadic<Maybeness<T>> {
  constructor(value: T) {
    super(maybe(value));
  }
}
