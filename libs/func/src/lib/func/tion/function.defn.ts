import { Val } from "../../val/val.defn";
import { isBool, isPrimitive } from "../../util";
import { Nom } from "../../nom/nom.defn";
import { Functorial, isFunctor } from "../tor/functor.defn";
import { Applicativity, isApplicative } from "../../app/applicative.defn";
import { isMonad, Monadic } from "../../mon/monad.defn";
import { AlphaValued } from "../../alpha/value";

export type Func<T, U> = (value: T, index: number, values: T[]) => U;
export const idFunc: Func<unknown, unknown[]> = (t) => new Array(1).fill(t);

export type UFunc<T, U> = (value: T) => U;
export type PFunc<T, U> = (value?: T) => U;
export type FAM<T> = Functorial<T> | Applicativity<T> | Monadic<T>;

export function nom<U>(u: any, type?: string): Nom<U> & Val<U> {
  const isPrim = isPrimitive(u);
  const t = isBool(isPrim) ? u["type"] + type ?? type : isPrim;
  return ({ u, t });
}

export const val: <T>(a: T) => PFunc<T, AlphaValued<T>>
  = <T>(u: T) => () => new AlphaValued(u);

export function isFAM<T>(a: any): a is FAM<T> {
  return isMonad(a) || isApplicative(a) || isFunctor(a);
}
