import { Nominator } from "@cosys/func";

export interface MonadicAction<A> extends Nominator<MonadicAction<A>> {
  type: "MonadicAction" & string;
  value: MonadicAction<A>;
}

export interface MonadicEffect<A> extends Nominator<MonadicEffect<A>> {
  type: "MonadicEffect";
  value: MonadicEffect<A>;
}

export class MonadicActivity<A> implements Nominator<MonadicActivity<A>> {
  type: "MonadicActivity" = "MonadicActivity";
  value!: A & MonadicActivity<A>;
}

export type MonadicEventStore<A> = MonadicActivity<A>;

export abstract class Action<A> implements MonadicAction<A> {
  readonly abstract type: "MonadicAction" & string;
  readonly value!: MonadicAction<A>;
}
