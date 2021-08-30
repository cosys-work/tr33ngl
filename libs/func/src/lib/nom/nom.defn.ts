import { ZenVal } from "../val/val.defn";

export interface Nom<U> {
  t: string;
}

export interface ZenNom<U> extends ZenVal<U>, Nom<U> {}
