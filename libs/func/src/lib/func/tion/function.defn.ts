import {Nom, Val} from "../../val/val.defn";
import {isNonPrimitive, isPrimitive, nonPrims} from "../../util";

import {Functorial, isFunctor} from "../tor/functor.defn";
import {Applicativity, isApplicative} from "../../app/applicative.defn";
import {isMonad, Monadic} from "../../mon/monad.defn";
import {AlphaValued} from "../../alpha/value";

export type Func<T, U> = (value: T, index: number, values: T[]) => U;
export type UFunc<T, U> = (value: T) => U;

export const idArr: <T>(t: T) => T[] = <T>(t: T) => new Array(1).fill(t);

export type PFunc<T, U> = (value?: T) => U;
export type FAM<T> = Functorial<T> | Applicativity<T> | Monadic<T>;

export function nom<U>(u: any, typ?: string): Nom<U> & Val<U> {
  const isPrim = isPrimitive(u);
  // we try our best to find the intended name
  const type: string = isNonPrimitive(u) && !isPrim ? typ ?? u["type"] ?? nonPrims.object : isPrim;
  return ({ u, type });
}

export const val: <T>(a: T) => PFunc<T, AlphaValued<T>>
  = <T>(u: T) => () => new AlphaValued(u);

export function isFAM<T>(a: any): a is FAM<T> {
  return isMonad(a) || isApplicative(a) || isFunctor(a);
}


export interface TypeWriter<U> {
  [key: string]: U;
}

export function typeWriter<U>(u: TypeWriter<U>) {
  return isNonPrimitive(u) ? u["type"] ?? typeof u : isPrimitive(u);
}
