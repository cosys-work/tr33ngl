import {FAM, Functorial, UFunc, Ts, UMapper, equivalence} from "@cosys/func";
import { AlphaFunctor } from "../alpha/functor";

export interface Applicativity<T> extends Functorial<T>{
  readonly functor: Functorial<T>;
  apply<U>(
    app: UFunc<T, U> | Applicativity<UFunc<T, U>>
  ): Applicativity<U>;
  pure<U>(u: U): Applicativity<U>;
  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U>;
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


  fmap<U>(  f:  UFunc<T, U> | Applicativity<UFunc<T, U>>): Applicativity<U> {
    const fts: UMapper<T> = this.self;
    const mappable: UFunc<T, U> = isApplicative(f) ? f.u : f;
    return new Applicative<U>(fts.map(mappable));
  }

  apply<U>(
    app: UFunc<T, U> | Applicativity<UFunc<T, U>>
  ):
    Applicativity<U>
  {
    const t: UFunc<T, U> = isApplicative(app) ? app.self.u : app;
    return new Applicative<U>(this.fmap((a) => t(a)).u);
  }
}


export function isApplicative<T>(a: Applicativity<T> | any): a is Applicativity<T> {
  return equivalence(a, () => new Applicative(""));
}
