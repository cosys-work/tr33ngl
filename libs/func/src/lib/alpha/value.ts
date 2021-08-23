import { ZenValued } from "../val/val.defn";
import { Ts } from "../util";

export class AlphaValued<T>
  extends ZenValued<T> {

  protected constructor(u: Ts<T>) {
    super(u);
  }
}
