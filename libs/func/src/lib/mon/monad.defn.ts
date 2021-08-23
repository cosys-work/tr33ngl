import { Applicative, Applicativity } from "../app/applicative.defn";
import { Ts } from "@cosys/func";
import { AlphaApplicative } from "../alpha/applicative";
import { flatten } from "../utils/utils";

export interface Monadic<T> extends Applicativity<T> {
  bind<U>(
    transformApp: (value: T) => Monadic<U>
  ): Monadic<Ts<U>>;
  return<U>(t: Ts<U>): Monadic<Ts<U>>;
}

export class Monad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  readonly applicative!: Applicativity<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.applicative = new Applicative(t);
  }

  bind<U>(transformApp: (value: T) => Monadic<U>): Monadic<Ts<U>> {

    const transMonads: Ts<Monadic<U>> = flatten(
        this.applicative
        .apply(new Applicative(transformApp))
        .fInside()
        .inside()
      );

    const us: U[] = transMonads.map(
      (mu)=> mu.u
    );

    return new Monad<U>(us);
  }

  return<U>(t: Ts<U>): Monadic<Ts<U>> {
    return new Monad<U>(t);
  }

}
