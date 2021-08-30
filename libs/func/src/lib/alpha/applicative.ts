import { AlphaFunctor } from "./functor";
import { Applicative, Applicativity } from "../app/applicative.defn";
import { FAM, Ts, UFunc } from "@cosys/func";

export class AlphaApplicative<T>
  extends AlphaFunctor<T>
  implements Applicativity<T> {

  readonly applicative!: Applicativity<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.applicative = new Applicative(t);
  }

  apply<U>(
    app: UFunc<T, U> | Applicativity<UFunc<T, U>>
  ): Applicativity<U>
  {
    return this.applicative.apply(app);
  }

  pure<U>(u: U): Applicativity<U> {
    return this.applicative.pure(u);
  }

  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U> {
    return this.applicative.fmap(f);
  }

}
