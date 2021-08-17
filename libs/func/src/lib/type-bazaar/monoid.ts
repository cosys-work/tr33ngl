import { AssocGroupoidal, eitherLElseR, Groupoid, Groupoidal, Left, Right, Unital } from "@cosys/func";

export class AbstractMonoid<T> implements AssocGroupoidal<T>, Unital<T> {

  private readonly m!: Monoid<T>;

  id(): Monoid<T> {
    return this;
  }

  constructor(protected n: T) {
    this.m = new Monoid<T>(n);
  }

  val(): T {
    return this.m.val();
  }

  assocOp(a: Groupoidal<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>): Groupoidal<T> {
    const lOrR = eitherLElseR(func.value(this.val(), a.val()), func.value(a.val(), this.val()));
    return new Groupoid<T>(lOrR.value);
  }

  op(a: Groupoidal<T>, func: (a: T, b: T) => T): Groupoidal<T> {
    return new Groupoid(func(this.val(), a.val()));
  }
}

export class Monoid<T> extends AbstractMonoid<T> implements AssocGroupoidal<T> {}
