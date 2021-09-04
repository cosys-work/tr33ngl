import {Nom, Val, ZenNom} from "../val/val.defn";
import {Ts} from "../util";
import {UMapper} from "../map/umap.defn";
import {nom} from "../func/tion/function.defn";

export class AlphaValued<U>
  extends UMapper<U>
  implements ZenNom<U> {

  readonly type!: string;
  readonly chomsky!: Nom<U> & Val<U>;
  readonly self!: UMapper<U>;

  constructor(t: Ts<U>, type?: string) {
    super(t);
    this.chomsky = nom(t, type);
    this.self = new UMapper(t);
    this.type = this.chomsky.type;
  }
}
