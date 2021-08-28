import { Applicative, Applicativity } from "../app/applicative.defn";
import { Ts } from "@cosys/func";
import { AlphaApplicative } from "../alpha/applicative";
import { flatten } from "../utils/utils";

export interface Monadic<T> extends Applicativity<T> {
  bind<U>(
    transformApp: (value: Ts<T>) => Monadic<U>
  ): Monadic<U>;
  pure<U>(u: U): Monadic<U>;
}

export class Monad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  readonly applicative!: Applicativity<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.applicative = new Applicative(t);
  }

  bind<U>(transformApp: (value: Ts<T>) => Monadic<U>): Monadic<U> {

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

  pure<U>(u: U): Monadic<U> {
    return new Monad(u);
  }

}
