import { Functor, Functorial, Mappable } from "@cosys/func";
import { AlphaFunctor } from "../alpha/functor";

export interface Applicativity<A> extends Functorial<A>{
  apply<U>(transformApp: Applicativity<(value: A) => U>, fa: Applicativity<A>):
    Functorial<U | U[]>;
}

export class Applicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  constructor(t: T) {
    super(t);
  }

  apply<U>(
    transformApp: Applicativity<(value: T) => U>,
    fa: Applicativity<T>
  ):
    Functorial<U | U[]>
  {
    const t: (value: T) => U = transformApp.self.u;
    const f: Mappable<T> = fa.self;
    const fIsPlural: boolean = f.length > 1;
    return new Functor(
      fIsPlural ?
        f.map(t) :
        f.map(t)[0]
    );
  }
}
