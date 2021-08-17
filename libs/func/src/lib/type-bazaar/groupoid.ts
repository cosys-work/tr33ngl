import { FValued, Left, Right } from "@cosys/func";
import { Unital } from "./unital";

// assoc op, id, inverse
export interface Groupoidal<T> extends FValued<T> {
  op: (a: Groupoidal<T>, func: (a: T, b: T) => T) => Groupoidal<T>;
}

export interface AssocGroupoidal<T> extends Groupoidal<T> {
  assocOp: (a: Groupoidal<T>, func: Left<(a: T, b: T) => T> | Right<(b: T, a: T) => T>) => Groupoidal<T>;
}

export interface InvGroupoidal<T> extends Groupoidal<T> {
  inv: (t: T, invFunc: (i: T) => [T, T]) => [Groupoidal<T>, Groupoidal<T>];
}

export interface UnaryGroupoidal<T> extends InvGroupoidal<T> {
  unaryOp: (a: Groupoidal<T>) => (func: (a: T, b: T) => T) => Groupoidal<T>;
}

export class Groupoid<T> implements UnaryGroupoidal<T>, Unital<T> {

  id(): Groupoid<T> {
    return this;
  }

  val(): T {
    return this.value;
  }

  op(a: Groupoid<T>, func: (xa: T, xb: T) => T): Groupoid<T> {
    return new Groupoid(func(this.val(), a.val()));
  }

  inv(t: T, invFunc: (i: T) => [T, T]): [Groupoid<T>, Groupoid<T>] {
    const [a, b] = invFunc(t);
    return [new Groupoid(a), new Groupoid(b)];
  }

  invOp(t: T, invFunc: (t: T) => [a: Groupoid<T>, b: Groupoid<T>], func: (xa: T, xb: T) => T): Groupoid<T> {
    const [a, b] = invFunc(t);
    return new Groupoid(func(a.val(), b.val()));
  }

  readonly unaryOp: (a: Groupoid<T>) => (func: (aT: T, bT: T) => T) => Groupoid<T>
    = (a) => (func) => new Groupoid(func(this.val(), a.val()));

  constructor(private readonly value: T) {
    this.value = value;
  }
}
