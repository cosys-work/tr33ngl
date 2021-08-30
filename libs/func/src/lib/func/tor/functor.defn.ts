import { Mappable, UMapper } from "../../map/umap.defn";
import { FAM, Func, UFunc } from "../tion/function.defn";

import { ZenVal } from "../../val/val.defn";
import { AlphaValued } from "../../alpha/value";
import { Ts } from "../../util";

export interface Functorial<T> extends Mappable<T>, ZenVal<T> {
  inside(): Ts<T>;
  fInside(): Functorial<T>;
  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U>;
  pure<U>(u: U): Functorial<U>;
  join<U>(ff: Functorial<unknown> | Functorial<Functorial<unknown>>): Functorial<U>;
}

export class Functor<T>
  extends AlphaValued<T>
  implements Functorial<T>, Mappable<T>, ZenVal<T> {

  constructor(t: Ts<T>) {
    super(t, "Functor");
  }

  inside(): Ts<T> {
    return this.map(_=>_);
  }

  fInside(): Functorial<T> {
    return this.fmap(_=>_);
  }

  map<U>(func: Func<T, U>): Ts<U> {
    return this.self.map(func);
  }

  //**
  // Create a new f u from an f t
  // using the results of calling
  // a function on every value in f t.
  // */
  fmap<U>(
    f: UFunc<T, U> | Functorial<UFunc<T, U>>,
  ):
    Functorial<U>
  {
    const fts: UMapper<T> = this.self;
    const mappable: UFunc<T, U> = isFunctor(f) ? f.u : f;
    return this.join(new Functor<U>(fts.map(mappable)));
  }

  join<U>(ff: Functorial<unknown> | Functorial<Functorial<unknown>>): Functorial<U> {
    const ffu: unknown | Functorial<unknown> = ff.u;
    return isFunctor(ffu) ? this.join(ffu) : ff as Functorial<U>;
  }

  pure<U>(u: Ts<U>): Functorial<U> {
    return new Functor(u);
  }

}

export function isFunctor<T>(f: Functorial<T> | any): f is Functorial<T> {
  const funcProperties = Object.keys(new Functor("example"));
  return f.hasOwnProperty && funcProperties.every(f.hasOwnProperty);
}

