import { Applicative, Applicativity } from "../app/applicative.defn";
import {FAM, isFAM, UFunc, Ts, UMapper, equivalence} from "@cosys/func";
import { AlphaApplicative } from "../alpha/applicative";
import { flatten } from "../utils/utils";

export interface Monadic<T> extends Applicativity<T> {
  bind<U>(
    transformApp: (value: Ts<T>) => Monadic<U>
  ): Monadic<U>;
  pure<U>(u: U): Monadic<U>;
  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U>
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
        .apply(transformApp)
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

  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U> {
    const fts: UMapper<T> = this.self;
    const mappable: UFunc<T, U> = isFAM(f) ? f.u : f;
    return new Monad<U>(fts.map(mappable));
  }
}

export function isMonad<T>(f: Monadic<T> | any): f is Monadic<T> {
  return equivalence(f, () => new Monad(""));
}
