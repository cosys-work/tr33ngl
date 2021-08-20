import { AlphaMonad, Monadic, ListoidNominated } from "@cosys/func";

export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>>
  implements Monadic<ListoidNominated<A>> {

  readonly value!: A & ListoidNominated<A>;
  constructor(value: A) {
    super(new ListoidNominated<A>(value));
    this.value = { ...super.value, ...value };
  }

  get length(): number {
    return this.monad.extract().length;
  }

  map(f: (val: A, index: number, values: A[]) =>  A[]) {
    return this.monad.extract().map(
      (nom) => nom.value
    ).map(f);
  }

}

