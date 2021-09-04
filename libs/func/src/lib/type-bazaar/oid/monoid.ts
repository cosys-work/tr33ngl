import {AssocGroupoidal, Groupoidal} from "./groupoid";
import {Left, Right} from "@cosys/func";
import {Unital} from "../mag/unital";


export class AbstractMonoid<T> implements AssocGroupoidal<T>, Unital<T> {

  readonly mon: T;

  constructor(protected n: T) {
    this.mon = n;
  }

  id(): AbstractMonoid<T> {
    return this;
  }

  val(): T {
    return this.mon;
  }

  assocOp(a: Groupoidal<T>, func: Left<(aa: T, bb: T) => T> | Right<(bb: T, aa: T) => T>): Groupoidal<T> {
    const lOrR = func.value(this.val(), a.val()) || func.value(a.val(), this.val());
    return new AbstractMonoid<T>(lOrR);
  }

  op(a: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new AbstractMonoid(func(this.val(), a.val()));
  }
}
