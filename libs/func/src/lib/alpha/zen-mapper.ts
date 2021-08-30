import { Mappable } from "../map/umap.defn";
import { Func } from "../func/tion/function.defn";
import { Ts } from "../util";
import { AlphaValued } from "./value";

export class AlphaZenMapper<T>
  extends AlphaValued<T>
  implements Mappable<T> {

  readonly length!: number;

  protected constructor(u: Ts<T>) {
    super(u);
    this.length = this.self.length;
  }

  id(u: T | T[]): AlphaZenMapper<T> {
    return new AlphaZenMapper(u);
  }

  map<U>(func: Func<T, U>): Ts<U> {
    return this.self.map<U>(func);
  }
}
