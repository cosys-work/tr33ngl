import { UMapper } from "../map/umap.defn";
import { Nom } from "../nom/nom.defn";


export interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly chomsky: Nom<U> & Val<U>;
  readonly self: UMapper<U>;
}

export type ValU = Val<unknown>;



