import { AssocGroupoidal, Either, Left, Right, Unital } from "@cosys/func";

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

  assocOp(a: AbstractMonoid<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>): AbstractMonoid<T> {
    const lOrR = new Either(func.value(this.val(), a.val()), func.value(a.val(), this.val()));
    return new AbstractMonoid<T>(lOrR.value.value);
  }

  op(a: AbstractMonoid<T>, func: (a: T, b: T) => T): AbstractMonoid<T> {
    return new AbstractMonoid(func(this.val(), a.val()));
  }
}

