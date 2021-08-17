import { Valued } from "@cosys/func";
import { Groupoidal } from "./groupoid";

export class Magma<T extends Valued<unknown>> implements Groupoidal<T> {

  val(): T {
    return this.value;
  }

  // closed
  op(a: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new Magma(func(this.val(), a.val()));
  }

  constructor(protected readonly value: T) {
    this.value = value;
  }
}



