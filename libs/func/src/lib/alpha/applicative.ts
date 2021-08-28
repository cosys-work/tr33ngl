import { AlphaFunctor } from "./functor";
import { Applicative, Applicativity } from "../app/applicative.defn";
import { Ts } from "@cosys/func";

export class AlphaApplicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  readonly applicative!: Applicativity<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.applicative = new Applicative(t);
  }

  apply<U>(
    transformApp: Applicativity<(value: T) => U>
  ): Applicativity<Ts<U>>
  {
    return this.applicative.apply(transformApp);
  }

  pure<U>(u: U): Applicativity<U> {
    return this.applicative.pure(u);
  }

}
