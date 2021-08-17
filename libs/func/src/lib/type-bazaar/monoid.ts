import { AssocGroupoidal, eitherLElseR, Groupoid, Left, Right, Valued } from "@cosys/func";
import { Groupoidal } from "./groupoid";
import { Unital } from "./unital";


export class Monoid<T extends Valued<unknown>> implements AssocGroupoidal<T> {

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

  assocOp(a: Groupoidal<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>): Groupoidal<T> {
    const t = eitherLElseR(func.value(this.val(), a.val()), func.value(a.val(), this.val()));
    return new Groupoid<T>(t.value);
  }

}
