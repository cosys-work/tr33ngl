import { AssocGroupoidal, eitherLElseR, Left, Right, Unital } from "@cosys/func";

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

  assocOp(a: AbstractMonoid<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>): AbstractMonoid<T> {
    const lOrR = eitherLElseR(func.value(this.val(), a.val()), func.value(a.val(), this.val()));
    return new AbstractMonoid<T>(lOrR.value);
  }

  op(a: AbstractMonoid<T>, func: (a: T, b: T) => T): AbstractMonoid<T> {
    return new AbstractMonoid(func(this.val(), a.val()));
  }
}

export class Monoid<T> extends AbstractMonoid<T> {}
