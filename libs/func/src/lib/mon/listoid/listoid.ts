import { AlphaMonad } from "../../alpha/monad";
import { ListoidNominated } from "./listoid.nominator";
import { Monadic } from "@cosys/func";


export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>>
  implements Monadic<ListoidNominated<A>> {

  readonly value!: A & ListoidNominated<A>;
  readonly length!: number;
  constructor(value: A) {
    super(new ListoidNominated<A>(value));
    this.value = { ...super.u, ...value };
    this.length = this.monad.length;
  }
}

