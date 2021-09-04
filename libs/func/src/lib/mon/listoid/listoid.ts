import {AlphaMonad} from "../../alpha/monad";
import {ListoidNominated} from "./listoid.nominator";
import {Ts} from "../../util";


export class Listoid<A>
  extends AlphaMonad<ListoidNominated<A>> {

  protected value!: Ts<A>;
  readonly length!: number;
  constructor(value: Ts<A>) {
    super(new ListoidNominated<A>(value));
    this.value = value;
    this.length = this.functor.length;
  }
}

export class FixedLenListoid<Number, T> extends Listoid<T> {

  readonly ref!: Array<T>;

  constructor(len: Number, arr: Array<T>, emp?: T) {
    super(arr);
    if (len.valueOf() <= arr.length) {
      this.ref = Array(len).map((_, i) => arr[i]);
    } else {
      this.ref = Array(len).map((_, i) => i < arr.length ? arr[i] : emp);
    }
  }
}
