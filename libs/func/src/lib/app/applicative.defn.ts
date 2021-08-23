import { Functor, Functorial, Ts } from "@cosys/func";
import { AlphaFunctor } from "../alpha/functor";

export interface Applicativity<T> extends Functorial<T>{
  readonly functor: Functorial<T>;
  apply<U>(
    transformApp: Applicativity<(value: T) => U>
  ): Applicativity<Ts<U>>;
}

export class Applicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  readonly functor!: Functorial<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.functor = new Functor<T>(t);
  }

  apply<U>(
    transformApp: Applicativity<(value: T) => U>
  ):
    Applicativity<Ts<U>>
  {
    const t: (a: T) => U = transformApp.self.u;
    const f: Functorial<T> = this.functor;
    return new Applicative(f.fmap((a) => t(a)).u);
  }
}
