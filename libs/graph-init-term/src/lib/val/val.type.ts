import { V } from "@cosys/graphoidal";

export interface ValType<U> extends V.Val<U> {
  t: string;
}

export function val<U>(u: U) {
  const t: string = typeof u;
  return ({ t, u });
}
