import { Additive, AdditiveMonoid, Additivity } from "./additive-monoid";


export interface Multiplicative<T> extends Additive<T> {
  multiply: (at: T) => T;
}

export interface Multiplicativity<T> extends Additivity<T> {
  multiplyOp: (a: T) => T;
  multiply: (a: MultiplicativeMonoid) => MultiplicativeMonoid;
}

export class MultiplicativeMonoid extends AdditiveMonoid implements Multiplicativity<number> {
  // Numeric
  multiplyOp(a: number): number {
    return this.val() * a;
  }

  multiply(a: MultiplicativeMonoid): MultiplicativeMonoid {
    const value = this.multiplyOp(a.val());
    return new MultiplicativeMonoid(value);
  }
}
