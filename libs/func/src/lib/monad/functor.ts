import { flatten, Mapper, Nominator, Typed } from "@cosys/func";
import { Observable, of } from "rxjs";

export interface NakedFunctorial<T> extends Nominator<T> {
  extract() : Mapper<T>;
  observe() : Observable<T>;
}

export interface Functorial<T> extends NakedFunctorial<T> {
  fmap<U extends Array<T>>(transform: (value: T) => U, fa: Functorial<T>): Functorial<U[]>;
  return<U>(value: U) : Functorial<U>;
}

export function isFunctor<T>(f: Typed): f is Functorial<T> {
  return f.type.startsWith("Functor");
}

export class Functor<T> implements Functorial<T> {

  readonly type: string = "Functor";
  readonly value!: T;

  constructor(tValue: T) {
    this.value = tValue;
  }

  extract(): Mapper<T> {
    return new Mapper(this.value);
  }

  get length(): number {
    return this.extract().length;
  }

  observe(): Observable<T> {
    return of(this.value);
  }

  return<U>(value: U): Functorial<U> {
    return new Functor(value);
  }

  fmap<U extends Array<T>>(transform: (value: T) => U, ft: Functorial<T>): Functorial<U[]> {
    const ret = ft.extract().map(transform);
    return this.return(flatten(ret));
  }

}

