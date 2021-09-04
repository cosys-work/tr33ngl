import { Val } from "../val/val.defn";
import { Ts } from "../util";
import { UMapper } from "../map/umap.defn";
import { Nom, ZenNom } from "../val/nom.defn";
import { nom } from "../func/tion/function.defn";

export class AlphaValued<U>
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
