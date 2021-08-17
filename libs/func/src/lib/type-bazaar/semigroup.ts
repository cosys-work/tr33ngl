// assoc bin op

import { Groupoid, Groupoidal } from "./groupoid";
import { Valued } from "@cosys/func";

export class Semigroup<T extends Valued<unknown>> implements Groupoidal<T> {

  op(a: Groupoidal<T>, b: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new Groupoid(func(a.val(), b.val()));
  }

  val(): T {
    return this.value;
  }

  constructor(protected readonly value: T) {
    this.value = value;
  }

}
