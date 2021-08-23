import { UMapper } from "../map/umap.defn";
import { Nom, nom, ZenNom } from "../nom/nom.defn";
import { Ts } from "../util";


export interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly chomsky: Nom<U> & Val<U>;
  readonly self: UMapper<U>;
}

export type ValU = Val<unknown>;

export class ZenValued<U>
  extends UMapper<U>
  implements ZenNom<U> {

  readonly t!: string;
  readonly chomsky!: Nom<U> & Val<U>;
  readonly self!: UMapper<U>;

  constructor(t: Ts<U>, type?: string) {
    super(t);
    this.chomsky = nom(t, type);
    this.self = new UMapper(t);
    this.t = this.chomsky.t;
  }
}


