import { Magma, FValued } from "@cosys/func";

export interface Unital<T> extends FValued<T> {
  id : () => Unital<T>;
}

export class UnitalMagma<T> extends Magma<T> {

  id(): UnitalMagma<T> {
    return this;
  }

  constructor(protected readonly value: T) {
    super(value);
  }
}
