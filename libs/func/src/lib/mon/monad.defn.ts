import { Applicativity } from "../app/applicative.defn";
import { Mappable } from "@cosys/func";
import { AlphaApplicative } from "../alpha/applicative";

export interface Monadic<T> extends Applicativity<T> {
  bind<U>(ma: Monadic<T>, transformApp: (value: T) => Monadic<U>): Monadic<U> | Monadic<U>[];
  return<U>(t: U): Monadic<U>;
}

export class Monad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  constructor(t: T) {
    super(t);
  }

  bind<U>(ma: Monadic<T>, transformApp: (value: T) => Monadic<U>): Monadic<U> | Monadic<U>[] {
    const ms: Mappable<T> = ma.self;
    const msIsPlural : boolean = ms.length > 1;
    return msIsPlural ?
      ms.map(transformApp) :
      ms.map(transformApp)[0];
  }

  return<U>(t: U): Monadic<U> {
    return new Monad<U>(t);
  }

}
