import { ZenValued } from "../val/val.defn";

export class AlphaValued<T>
  extends ZenValued<T> {

  protected constructor(u: T) {
    super(u);
  }
}
