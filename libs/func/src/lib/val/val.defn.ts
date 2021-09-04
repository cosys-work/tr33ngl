import {UMapper} from "../map/umap.defn";

export interface Nom<U> {
  readonly type: string;
}

export interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly chomsky: Nom<U> & Val<U>;
  readonly self: UMapper<U>;
}

export interface ZenNom<U> extends ZenVal<U>, Nom<U> {}

export type ValU = Val<unknown>;
