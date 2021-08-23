
import { firstValueFrom, from, Observable, of } from "rxjs";
import { Graphoid, Listoid } from "@cosys/func";

export type FType<V> = V;
export type FList<T> = Listoid<FType<T>[]>;
export type FStruct<T> = Graphoid<[FList<FType<T>>], [FList<T>]>;

export interface FValued<T> {
  val: () => T;
}

export type F<T> = FType<T> | FValued<T>| FList<T> | FStruct<T>;

export function isPromisable<T>(rx: any): rx is Promise<T> {
  return rx.hasOwnProperty("then") && rx.hasOwnProperty("finally") && rx.hasOwnProperty("catch");
}

export function isPromising<T>(rx: any): rx is Observable<T> {
  return rx.hasOwnProperty("subscribe") && rx.hasOwnProperty("unsubscribe");
}

export type Callable<T> = ((u?: unknown) => T);

export type Reactable<T> = Promise<T> | Observable<T> | Callable<T>;


export function rxtiv2obs<T>(rx: Reactable<T>): Observable<T> {
  if (isPromisable(rx)) {
    return from(rx);
  } else if (isPromising(rx)) {
    return rx;
  } else {
    return of(rx());
  }
}

export async function rxtiv2prom<T>(rx: Reactable<T>): Promise<Callable<T>> {
  if (isPromisable(rx)) {
    const rxWt = await rx;
    return  () => rxWt;
  } else if (isPromising(rx)) {
    return new Promise(() => firstValueFrom(rx));
  } else {
    return new Promise(() => rx());
  }
}






