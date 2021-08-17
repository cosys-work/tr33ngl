import { Groupoidal } from "./groupoid";

export class Magma<T> implements Groupoidal<T> {

  val(): T {
    return this.value;
  }

  // closed
  op(a: Magma<T>, func: (a: T, b: T) => T): Magma<T> {
    return new Magma(func(this.val(), a.val()));
  }

  constructor(protected readonly value: T) {
    this.value = value;
  }
}



