import { Valued } from "../utils/nominators";
import { AbstractMonoid } from "../type-bazaar/oid/monoid";


export interface Additive<T> extends Valued<T> {
  add: (at: T) => T;
}

export interface Additivity<T> {
  addOp: (a: T) => T;
  add: (a: AdditiveMonoid) => AdditiveMonoid;
}

export class AdditiveMonoid extends AbstractMonoid<number> implements Additivity<number> {

  // Numeric
  addOp(a: number): number {
    return this.val() + a;
  }

  add(a: AdditiveMonoid): AdditiveMonoid {
    const value = this.addOp(a.val());
    return new AdditiveMonoid(value);
  }
}

