import { isBool, isPrimitive, Val } from "@cosys/graphoidal";

export interface Nom<U> extends Val<U> {
  t: string;
}

export function nom<U>(u: any, type?: string): Nom<U>{
  const isPrim = isPrimitive(u);
  const t = !isBool(isPrim) ? isPrim : u["type"] ?? type;
  return ({ t, u });
}

