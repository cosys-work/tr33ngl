import { isBool, isPrimitive, Val, ZenVal } from "@cosys/func";


export interface Nom<U> {
  t: string;
}

export interface ZenNom<U> extends ZenVal<U>, Nom<U> {}

export function nom<U>(u: any, type?: string): Nom<U> & Val<U> {
  const isPrim = isPrimitive(u);
  const t = !isBool(isPrim) ? isPrim : u["type"] ?? type;
  return ({ u, t });
}
