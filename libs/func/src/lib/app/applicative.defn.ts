import { FAM, Functorial, PFunc, Ts, UMapper } from "@cosys/func";
import { AlphaFunctor } from "../alpha/functor";

export interface Applicativity<T> extends Functorial<T>{
  readonly functor: Functorial<T>;
  apply<U>(
    app: PFunc<T, U> | Applicativity<PFunc<T, U>>
  ): Applicativity<U>;
  pure<U>(u: U): Applicativity<U>;
  fmap<U>(  f:  PFunc<T, U> | FAM<PFunc<T, U>>): FAM<U>;
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


  fmap<U>(  f:  PFunc<T, U> | Applicativity<PFunc<T, U>>): Applicativity<U> {
    const fts: UMapper<T> = this.self;
    const mappable: PFunc<T, U> = isApplicative(f) ? f.u : f;
    return new Applicative<U>(fts.map(mappable));
  }

  apply<U>(
    app: PFunc<T, U> | Applicativity<PFunc<T, U>>
  ):
    Applicativity<U>
  {
    const t: (a: T) => U = isApplicative(app) ? app.self.u : app;
    const f: Functorial<T> = this.functor;
    return new Applicative<U>(f.fmap((a) => t(a)).u);
  }
}


export function isApplicative<T>(f: Applicativity<T> | any): f is Applicativity<T> {
  const funcProperties = Object.keys(new Applicative("example"));
  return f.hasOwnProperty && funcProperties.every(f.hasOwnProperty);
}
