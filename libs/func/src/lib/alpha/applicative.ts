import { AlphaFunctor } from "./functor";
import { Applicative, Applicativity } from "../app/applicative.defn";
import { Functorial } from "@cosys/func";

export class AlphaApplicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  protected readonly applicative!: Applicativity<T>;

  constructor(t: T) {
    super(t);
    this.applicative = new Applicative(t);
  }

  apply<U>(
    transformApp: Applicativity<(value: T) => U>,
    fa: Applicativity<T>
  ): Functorial<U | U[]>
  {
    return this.applicative.apply(transformApp, fa);
  }

}
