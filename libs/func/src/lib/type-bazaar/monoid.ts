import { AssocGroupoidal } from "@cosys/func";
import { AbstractMonoid } from "../../examples/mono";


export class Monoid<T> extends AbstractMonoid<T> implements AssocGroupoidal<T> {

  id(): Monoid<T> {
    return this;
  }
}
