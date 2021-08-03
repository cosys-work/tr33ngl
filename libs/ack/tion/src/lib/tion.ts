import { Nominator } from "@cosys/func";
import {
  CartesSpaceHGraph,
  CartesSpaceTimeGraf,
  CartesSpaceTimeHGraph,
  CartesTimeHGraph,
  hGraph2Graf
} from "../../../../func/src/lib/graphoid/cartes-graph";

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

  readonly cartesGraph!: CartesSpaceTimeGraf;
  readonly cartesHGraph!: CartesSpaceTimeHGraph;

  protected constructor(ns: CartesTimeHGraph[], es: CartesSpaceHGraph[]) {
    this.cartesHGraph = new CartesSpaceTimeHGraph(ns, es);
    // const {nodes, edges} = this.cartesHGraph.indices;
    this.cartesGraph = hGraph2Graf(this.cartesHGraph);
    this.value = this;
  }
}
