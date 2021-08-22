import { Nominator } from "../utils/nominators";

export interface MonadicAction<A> extends Nominator<MonadicAction<A>> {
  type: "MonadicAction";
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
