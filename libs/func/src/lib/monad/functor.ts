import { flatten, Mappable, Mapper, Nominator, Ts, Typed } from "@cosys/func";
import { from, Observable } from "rxjs";

export interface NakedFunctorial<T> extends Nominator<T> {
  extract() : Mappable<T>;
  observe() : Observable<T>;
}

export interface Functorial<T> extends NakedFunctorial<T> {
  id: () => Ts<T>;
  fmap2: <U>(transform: (value: T) => U, fa: Functorial<T>) => FuncUOrFuncUs<U>;
  fmap: <U>(transform: (value: T) => U, fa: Functorial<T>) => Functorial<U[]>;
  return: <U>(value: U) => FuncUOrFuncUs<U>;
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

  id(): Ts<T> {
    return this.extract().id();
  }

  extract(): Mappable<T> {
    return new Mapper(this.value);
  }

  get length(): number {
    return this.id().length;
  }

  observe(): Observable<T> {
    return from(this.id());
  }

  return<U>(value: U): Functorial<U> {
    return new Functor<U>(value);
  }

  fmap2<U>(transform: (value: T) => U, fa: Functorial<T>): FuncUOrFuncUs<U> {
    const ret: Ts<U> = fa.extract().id().map(transform);
    return ret.length === 1 ? this.return(flatten(ret)[0]) : this.return(flatten(ret));
  }

  fmap<U>(transform: (value: T) => U, fa: Functorial<T>): Functorial<U[]> {
    const ret: Ts<U> = fa.extract().id().map(transform);
    return this.return(flatten(ret));
  }

}

export type FuncUOrFuncUs<U> = Functorial<U> | Functorial<Ts<U>>;

