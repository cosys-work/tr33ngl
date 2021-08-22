import { Val, ZenValued } from "../val/val.defn";
import { Mappable } from "../map/umap.defn";
import { Func } from "../func/tion/function.defn";

export class AlphaZenMapper<T>
  extends ZenValued<T>
  implements Mappable<T> {

  readonly length!: number;

  protected constructor(u: T) {
    super(u);
    this.length = this.self.length;
  }

  id(u: T): Mappable<T> & Val<T> {
    const { map, length } = this.self.map(u => u);
    return ({ u, map, length});
  }

  map<U>(func: Func<T, U>): U[] {
    return this.self.map<U>(func);
  }
}
