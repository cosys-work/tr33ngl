
import { Functor, Functorial } from "@cosys/func";
import { AlphaZenMapper } from "./zen-mapper";


export class AlphaFunctor<T>
  extends AlphaZenMapper<T>
  implements Functorial<T> {

  protected readonly functor!: Functorial<T>;

  protected constructor(t: T) {
    super(t);
    this.functor = new Functor<T>(t);
  }

  flip<U>(func: Functorial<U>, a: T): Functorial<T[] | T> {
    return this.functor.flip(func, a);
  }

  fmap<U>(f: (a: T) => U, func: Functorial<T>): Functorial<U[] | U> {
    return this.functor.fmap(f, func);
  }

  frip<U>(a: T, func: Functorial<U>): Functorial<T[] | T> {
    return this.functor.frip(a, func);
  }

}
