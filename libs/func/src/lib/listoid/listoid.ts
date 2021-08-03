import { Nominator } from "../nominators";
import { Monad } from "../monad/monad";

export class Listoid<A extends Array<unknown>> extends Monad<A> implements Nominator<A> {
  readonly type: "Listoid" = "Listoid";
  value!: A;

  constructor(value: A) {
    super(value);
    this.value = value;
  }

}

export type ListoidV<A> = Pick<Listoid<A[]>, "value">;
