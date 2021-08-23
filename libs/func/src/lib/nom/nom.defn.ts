import { isBool, isPrimitive, ZenVal, ZenValued } from "@cosys/func";


export interface Nom<U> {
  t: string;
}

export interface ZenNom<U> extends ZenVal<U>, Nom<U> {}

export function nom<U>(u: any, t?: string): ZenNom<U>{
  const isPrim = isPrimitive(u);
  const type = !isBool(isPrim) ? isPrim : u["type"] ?? t;
  return new ZenValued(u, type);
}
