import { Val, ZenValued } from "../../val/val.defn";
import { isBool, isPrimitive } from "../../util";
import { Nom } from "../../nom/nom.defn";

export type Func<T, U> = (value: T, index: number, values: T[]) => U;
export const idFunc: Func<unknown, unknown[]> = (t) => new Array(1).fill(t);

export type ProcFunc<T, U> = (value: T) => U;

export function nom<U>(u: any, type?: string): Nom<U> & Val<U> {
  const isPrim = isPrimitive(u);
  const t = !isBool(isPrim) ? isPrim : u["type"] ?? type;
  return ({ u, t });
}

export const val: <T>(u: T) => ProcFunc<T, ZenValued<T>> = (u) => () => {
  return new ZenValued(u);
}

// export const fmap: <T, U>( f: (a: T) => U): Functorial<Ts<U>>
