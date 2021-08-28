import { Functorial, Ts } from "@cosys/func";
import { AlphaFunctor } from "../alpha/functor";

export interface Applicativity<T> extends Functorial<T>{
  readonly functor: Functorial<T>;
  apply<U>(
    transformApp: Applicativity<(value: T) => U>
  ): Applicativity<Ts<U>>;
  pure<U>(u: U): Applicativity<U>;
}

export class Applicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  constructor(t: Ts<T>) {
    super(t);
  }

  pure<U>(u: U): Applicativity<U> {
    return new Applicative(u);
  }

  apply<U>(
    transformApp: Applicativity<(value: T) => U>
  ):
    Applicativity<Ts<U>>
  {
    const t: (a: T) => U = transformApp.self.u;
    const f: Functorial<T> = this.functor;
    return new Applicative<Ts<U>>(f.fmap((a) => t(a)).u);
  }
}
