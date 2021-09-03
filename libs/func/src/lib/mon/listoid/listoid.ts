import { AlphaMonad } from "../../alpha/monad";
import { ListoidNominated } from "./listoid.nominator";
import {Ts} from "../../util";


export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>> {

  readonly value!: Ts<A>;
  readonly length!: number;
  constructor(value: Ts<A>) {
    super(new ListoidNominated<A>(value));
    this.value = { ...super.u, ...value };
    this.length = this.monad.length;
  }
}
