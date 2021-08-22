import { AssocGroupoidal, Groupoidal } from "./groupoid";
import { Either, Left, Right } from "../../mon/either/either";
import { Unital } from "../ma/unital";


export class AbstractMonoid<T> implements AssocGroupoidal<T>, Unital<T> {

  constructor(protected n: T) {
    this.n = n;
  }

  id(): AbstractMonoid<T> {
    return this;
  }

  val(): T {
    return this.n;
  }

  assocOp(a: Groupoidal<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>): Groupoidal<T> {
    const lOrR = new Either(func.value(this.val(), a.val()), func.value(a.val(), this.val()));
    return new AbstractMonoid<T>(lOrR.u.value);
  }

  op(a: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new AbstractMonoid(func(this.val(), a.val()));
  }
}

