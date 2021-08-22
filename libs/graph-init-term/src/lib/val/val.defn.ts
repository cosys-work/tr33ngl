import { Mappable, Mapper } from "../map/umap.defn";


export interface Val<U> {
  readonly u: U;
}

export interface ZenVal<U> extends Val<U> {
  readonly id: (u: U) => Mappable<U>;
  readonly self: Mappable<U>;
}

export type ValU = Val<unknown>;

export class ZenValued<U>
  implements ZenVal<U> {

  readonly u!: U;
  readonly self!: Mappable<U>;

  constructor(u: U) {
    this.u = u;
    this.self = this.id(this.u)
  }

  id(u: U): Mappable<U> {
    return new Mapper<U>(u);
  }
}


