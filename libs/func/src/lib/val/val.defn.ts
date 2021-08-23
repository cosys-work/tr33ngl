import { UMapper } from "../map/umap.defn";
import { nom, Nom } from "../nom/nom.defn";
import { Ts } from "../util";


interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly id: (u: U) => UMapper<U>;
  readonly chomsky: Nom<U>;
  readonly self: UMapper<U>;
}

export type ValU = Val<unknown>;

export class ZenValued<U>
  extends UMapper<U>
  implements ZenVal<U> {

  readonly chomsky: Nom<U>;
  readonly self!: UMapper<U>;

  constructor(u: Ts<U>) {
    super(u);
    this.chomsky = nom(u);
    this.self = this.id(this.u)
  }

  id(u: U): UMapper<U> {
    return new UMapper<U>(u);
  }
}


