import { Nominator } from "../nominators";
import { Observable, of } from "rxjs";
import { flatten } from "../utils";
import { Mapper, Ts } from "../mappable";


export interface NakedFunctorial<T> {
  extract() : Mapper<T>;
  observe() : Observable<Ts<T>>;
}

export interface Functorial<T> extends NakedFunctorial<T> {
  fmap<U extends Array<T>>(transform: (value: T) => U, fa: Functorial<T>): Functorial<U[]>;
  return<U>(value: U) : Functorial<U>;
}

export function isFunctor<T>(f: Functorial<T> | unknown): f is Functorial<T> {
  return Object.keys(f).filter((key: string) => key === "type").map((type) => f[type]).includes("Functor")
}

export class Functor<T> implements Functorial<T>, Nominator<T> {

  readonly type: string = "Functor";
  readonly value!: T;

  extract(): Mapper<T> {
    return new Mapper([this.value]);
  }

  observe(): Observable<Ts<T>> {
    return of(this.extract().val);
  }

  return<U>(value: U): Functorial<U> {
    return new Functor(value) as Functorial<U>;
  }


  fmap<U extends Array<T>>(transform: (value: T) => U, ft: Functorial<T>): Functorial<U[]> {
    const flattened = flatten(ft.extract().map(transform));
    return this.return(flattened);
  }

  constructor(tValue: T) {
    this.value = tValue;
  }


}

