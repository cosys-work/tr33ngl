import { AlphaFunctor } from "./functor";
import { Applicative, Applicativity } from "../app/applicative.defn";
import { FAM, PFunc, Ts } from "@cosys/func";

export class AlphaApplicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  readonly applicative!: Applicativity<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.applicative = new Applicative(t);
  }

  apply<U>(
    app: PFunc<T, U> | Applicativity<PFunc<T, U>>
  ): Applicativity<U>
  {
    return this.applicative.apply(app);
  }

  pure<U>(u: U): Applicativity<U> {
    return this.applicative.pure(u);
  }

  fmap<U>(  f:  PFunc<T, U> | FAM<PFunc<T, U>>): FAM<U> {
    return this.applicative.fmap(f);
  }

}
