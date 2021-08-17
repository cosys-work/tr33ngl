import { AbstractMonoid, Valued } from "@cosys/func";

export interface Additive<T> extends Valued<T> {
  add: (at: T) => T;
}

export interface Multiplicative<T> extends Additive<T> {
  multiply: (at: T) => T;
}

export class AdditiveMonoid extends AbstractMonoid<Additive<number>> {

  adder(a: Additive<number>): Additive<number> {
    const value = this.val().add(a.value);
    const add = (at: number) => this.val().add(at);
    return ({
      value,
      add
    });
  }

  add(a: AdditiveMonoid): AdditiveMonoid {
    const value = this.val().value + a.val().value;
    const add = (at: number) => this.val().value + at;
    return new AdditiveMonoid(({
      value,
      add
    }));
  }

}

export class MultiplicativeMonoid extends AbstractMonoid<Multiplicative<number>> {

  multiplier(a: Multiplicative<number>): Multiplicative<number> {
    const value = this.val().multiply(a.value);
    const add = (at: number) => this.val().add(at);
    const multiply = (at: number) => this.val().multiply(at);
    return ({
      value,
      add,
      multiply
    })
  }

  multiply(a: MultiplicativeMonoid): MultiplicativeMonoid {
    const value = this.val().value * a.val().value;
    const add = (at: number) => this.val().value + at;
    const multiply = (at: number) => this.val().value * at;
    return new MultiplicativeMonoid({
      value,
      add,
      multiply
    })
  }

}
