import { UMapper } from "../map/umap.defn";
import { Nom, ZenNom } from "../nom/nom.defn";
import { Ts } from "../util";
import { nom } from "../func/tion/function.defn";


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


