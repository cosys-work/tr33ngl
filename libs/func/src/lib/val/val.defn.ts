import { Mappable, Mapper } from "../map/umap.defn";
import { nom, Nom } from "../nom/nom.defn";


export interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly id: (u: U) => Mappable<U>;
  readonly chomsky: Nom<U>;
  readonly self: Mappable<U>;
}

export type ValU = Val<unknown>;

export class ZenValued<U>
  implements ZenVal<U> {

  readonly chomsky: Nom<U>;
  readonly u!: U;
  readonly self!: Mappable<U>;

  constructor(u: U) {
    this.u = u;
    this.chomsky = nom(u);
    this.self = this.id(this.u)
  }

  id(u: U): Mappable<U> {
    return new Mapper<U>(u);
  }
}


