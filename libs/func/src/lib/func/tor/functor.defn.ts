import { Mappable, UMapper } from "../../map/umap.defn";
import { Func } from "../tion/function.defn";

import { ZenVal } from "../../val/val.defn";
import { AlphaValued } from "../../alpha/value";
import { Ts } from "../../util";

export interface Functorial<T> extends Mappable<T>, ZenVal<T> {
  inside(): Ts<T>;
  fInside(): Functorial<Ts<T>>;
  fmap<U>( f: (a: T) => U): Functorial<Ts<U>>;
}

export class Functor<T>
  extends AlphaValued<T>
  implements Functorial<T>, Mappable<T>, ZenVal<T> {

  constructor(t: Ts<T>) {
    super(t);
  }

  inside(): Ts<T> {
    return this.map(_=>_);
  }

  fInside(): Functorial<Ts<T>> {
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
    f: (a: T) => U,
  ):
    Functorial<Ts<U>>
  {
    const fts: UMapper<T> = this.self;
    return new Functor<Ts<U>>(fts.map(f));
  }

}


