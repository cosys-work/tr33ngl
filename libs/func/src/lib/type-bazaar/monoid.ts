import { Valued } from "@cosys/func";
import { Groupoidal } from "./groupoid";
import { Unital } from "./unital";


export class Monoid<T extends Valued<unknown>> implements Groupoidal<T> {

  id(): Unital<T> {
    return this;
  }

  val(): T {
    return this.value;
  }

  // associative
  op(a: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new Monoid(func(this.val(), a.val()) ?? func(a.val(), this.val()));
  }

  constructor(private readonly value: T) {
    this.value = value;
  }

}
