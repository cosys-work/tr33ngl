import { Mappable, Mapper } from "../../map/umap.defn";
import { Func } from "../tion/function.defn";

import { ZenVal } from "../../val/val.defn";
import { AlphaValued } from "../../alpha/value";

export interface Functorial<T> extends Mappable<T>, ZenVal<T> {
  fmap<U>( f: (a: T) => U, func: Functorial<T>): Functorial<U | U[]>;
  frip<U>(a: T, func: Functorial<U>): Functorial<T | T[]>;
  flip<U>(func: Functorial<U>, a: T): Functorial<T | T[]>;
}

export class Functor<T>
  extends AlphaValued<T>
  implements Functorial<T>, Mappable<T>, ZenVal<T> {

  readonly length!: number;
  protected readonly mapper!: Mappable<T>;

  constructor(t: T) {
    super(t);
    this.mapper = new Mapper<T>(t);
    this.length = this.mapper.length;
  }

  map<U>(func: Func<T, U>): U[] {
    return this.mapper.map(func);
  }

  //**
  // Create a new f u from an f t
  // using the results of calling
  // a function on every value in f t.
  // */
  fmap<U>(
    f: (a: T) => U,
    ft: Functorial<T>
  ):
    Functorial<U | U[]>
  {
    const fts: Mappable<T> = ft.self;
    const ftsIsPlural: boolean = ft.length > 1;
    return new Functor<U | U[]>(
      ftsIsPlural ?
        fts.map(f) :
        fts.map(f)[0]
    );
  }

  //**
  // Create a new f t from an f u
  // by replacing all of the values
  // in the f u by a given value of type t
  // */
  frip<U>(
    a: T,
    func: Functorial<U>
  ):
    Functorial<T | T[]>
  {
    const fs: Mappable<U> = func.self;
    const fsIsPlural: boolean = func.length > 1;
    const subA: (_: U) => T = (_: U) => a;
    return new Functor<T | T[]>(
      fsIsPlural ?
        fs.map(subA) :
        fs.map(subA)[0]
    );
  }

  flip<U>(
    func: Functorial<U>,
    a: T
  ):
    Functorial<T | T[]>
  {
    return this.frip(a, func);
  }

}


