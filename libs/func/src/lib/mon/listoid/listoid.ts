import { AlphaMonad } from "../../alpha/monad";
import { ListoidNominated } from "./listoid.nominator";


export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>> {

  readonly value!: A;
  readonly length!: number;
  constructor(value: A) {
    super(new ListoidNominated<A>(value));
    this.value = { ...super.u, ...value };
    this.length = this.monad.length;
  }
}

