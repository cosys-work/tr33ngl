import {AlphaMonad} from "../../alpha/monad";
import {ListoidNominated} from "./listoid.nominator";
import {Ts} from "../../util";


export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>> {

  readonly value!: Ts<A>;
  readonly length!: number;
  constructor(value: Ts<A>) {
    super(new ListoidNominated<A>(value));
    this.value = value;
    this.length = this.functor.length;
  }
}

export class FixedLenListoid<T> extends Listoid<T> {

  ref!: Array<T>;

  constructor(arr: Array<T>) {
    super(arr);
    this.ref = Array(arr.length).map((_, i) => arr[i]);
  }
}
