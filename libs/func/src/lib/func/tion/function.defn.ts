import { Val } from "../../val/val.defn";
import { isBool, isPrimitive, Ts } from "../../util";
import { Nom } from "../../nom/nom.defn";
import { Functor, Functorial } from "../tor/functor.defn";
import { Applicative, Applicativity } from "../../app/applicative.defn";
import { Monadic } from "../../mon/monad.defn";
import { AlphaValued } from "../../alpha/value";

export type Func<T, U> = (value: T, index: number, values: T[]) => U;
export const idFunc: Func<unknown, unknown[]> = (t) => new Array(1).fill(t);

export type ProcFunc<T, U> = (value: T) => U;

export function nom<U>(u: any, type?: string): Nom<U> & Val<U> {
  const isPrim = isPrimitive(u);
  const t = !isBool(isPrim) ? isPrim : u["type"] ?? type;
  return ({ u, t });
}

export const val: <T>(a: T) => ProcFunc<T, AlphaValued<T>>
  = <T>(u: T) => () => {
  return new AlphaValued(u);
}

export const fmap: <T>(t: Ts<T>) =>
  <U>(f: (a: T) => U) => ProcFunc<T, Functorial<Ts<U>>>
  = <T>(t: Ts<T>) => <U>(f: (a: T) => U) => () => {
  return new Functor(t).fmap(f);
}

export type FAM<T> = Functorial<T> | Applicativity<T> | Monadic<T>;

export const pure: <T>(famT: FAM<T>) => <U>(u: U) =>
  ProcFunc<T, FAM<Ts<U>>>
  = <T>(famT: FAM<T>) => <U>(u: U) => () => {
  return famT.pure(u);
}

export const id: <T>(t: FAM<T>) => ProcFunc<T, FAM<T>>
  = <T>(t: FAM<T>) => () => {
  return t.pure(t.u);
}


export const apply: <T>(t: Ts<T>) => <U>(f: Applicativity<(a: T) => U>) =>
  ProcFunc<T, Applicativity<Ts<U>>>
  = <T>(t: Ts<T>) => <U>(f: Applicativity<(a: T) => U>) => () => {
  return new Applicative(t).apply(f);
}
