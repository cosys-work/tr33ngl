// assoc op, id, inverse
import { Unital } from "../mag/unital";
import { FValued } from "../../utils/shopzero";
import { Left, Right } from "@cosys/func";

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

  op(a: Groupoidal<T>, func: (xa: T, xb: T) => T): Groupoidal<T> {
    return new Groupoid(func(this.val(), a.val()));
  }

  inv(t: T, invFunc: (i: T) => [T, T]): [Groupoidal<T>, Groupoidal<T>] {
    const [a, b] = invFunc(t);
    return [new Groupoid(a), new Groupoid(b)];
  }

  invOp(t: T, invFunc: (t: T) => [a: Groupoidal<T>, b: Groupoidal<T>], func: (xa: T, xb: T) => T): Groupoidal<T> {
    const [a, b] = invFunc(t);
    return new Groupoid(func(a.val(), b.val()));
  }

  readonly unaryOp: (a: Groupoidal<T>) => (func: (aT: T, bT: T) => T) => Groupoidal<T>
    = (a) => (func) => new Groupoid(func(this.val(), a.val()));

  constructor(private readonly value: T) {
    this.value = value;
  }
}
