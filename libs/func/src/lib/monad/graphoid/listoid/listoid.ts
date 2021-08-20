import { AlphaMonad, isMappable, Monad, Monadic } from "@cosys/func";
import { ListoidNom, ListoidNominated } from "./listoid.nominator";

export class Listoid<A> extends AlphaMonad<ListoidNominated<A>> implements Monadic<ListoidNominated<A>>, ListoidNominated<A> {
  readonly type = ListoidNom.Simple;
  readonly value!: A & ListoidNominated<A>;
  readonly monad!: Monad<ListoidNominated<A>>;

  constructor(value: A) {
    super(new ListoidNominated<A>(value));
    this.value = { ...new ListoidNominated<A>(value), ...value };
    this.monad = new Monad(this.value);
  }

  get length(): number {
    return isMappable(this.value) ?
      this.value.length :
      1;
  }

  map(f: (val: A, index: number, values: A[]) =>  A[]) {
    return isMappable(this.value) ?
      this.value.map(f) :
      f(this.value, 0, [this.value])
  }

}

