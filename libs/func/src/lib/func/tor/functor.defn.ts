import { Mappable, UMapper } from "../../map/umap.defn";
import { FAM, Func, UFunc } from "../tion/function.defn";

import { ZenVal } from "../../val/val.defn";
import { AlphaValued } from "../../alpha/value";
import {equivalence, Ts} from "../../util";

export interface Functorial<T> extends Mappable<T>, ZenVal<T> {
  inside(): Ts<T>;
  fInside(): Functorial<T>;
  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U>;
  pure<U>(u: U): Functorial<U>;
  join<U>(ff: Functorial<U> | Functorial<Functorial<U>>): Functorial<U>;
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

  join<U>(ff: Functorial<U> | Functorial<Functorial<U>>): Functorial<U> {
    const ffu: U | Functorial<U> = ff.u;
    return isFunctor(ffu) ? ffu : this.pure(ffu);
  }

  pure<U>(u: Ts<U>): Functorial<U> {
    return new Functor(u);
  }

}

export function isFunctor<T>(a: Functorial<T> | any): a is Functorial<T> {
  return equivalence(a, () => new Functor(""));
}
