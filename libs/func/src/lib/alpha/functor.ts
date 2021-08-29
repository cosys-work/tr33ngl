
import { FAM, Functor, Functorial, PFunc, Ts } from "@cosys/func";
import { AlphaZenMapper } from "./zen-mapper";


export class AlphaFunctor<T>
  extends AlphaZenMapper<T>
  implements Functorial<T> {

  readonly functor!: Functorial<T>;

  protected constructor(t: Ts<T>) {
    super(t);
    this.functor = new Functor<T>(t);
  }

  fmap<U>(  f:  PFunc<T, U> | FAM<PFunc<T, U>>): FAM<U> {
    return this.functor.fmap(f);
  }

  pure<U>(u: U): Functorial<U> {
    return this.functor.pure(u);
  }

  inside(): Ts<T> {
    return this.functor.inside();
  }

  fInside(): Functorial<T> {
    return this.functor.fInside();
  }

  join<U>(ff: Functorial<unknown> | Functorial<Functorial<unknown>>): Functorial<U> {
    return this.functor.join(ff);
  }
}
