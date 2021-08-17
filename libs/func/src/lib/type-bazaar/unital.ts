import { FValued, Valued } from "@cosys/func";
import { Magma } from "./magma";


export interface Unital<T> extends FValued<T> {
  id : () => Unital<T>;
}


export class UnitalMagma<T extends Valued<unknown>> extends Magma<T> {

  id(): Unital<T> {
    return this;
  }

  constructor(protected readonly value: T) {
    super(value);
  }
}
