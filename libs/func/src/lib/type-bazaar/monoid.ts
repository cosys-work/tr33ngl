import { AssocGroupoidal } from "@cosys/func";
import { Unital } from "./unital";
import { AbstractMonoid } from "../../examples/mono";


export class Monoid<T> extends AbstractMonoid<T> implements AssocGroupoidal<T> {

  id(): Unital<T> {
    return this;
  }
}
