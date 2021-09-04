import {Nominator} from "../../../utils/nominators";
import {Graph, HGraph} from "./h-graph";
import {TimeCoordinate} from "./cartes-en";
import {Ts} from "../../../util";


export abstract class CartesGraf<T, S> implements Nominator<CartesGraf<T, S>> {
  indices!: Graph<T, S>;
  abstract type: string;
  abstract value: CartesGraf<T, S>;

  protected constructor(ns: Ts<T>, es: Ts<S>) {
    this.indices = new HGraph(ns, es);
  }
}

export abstract class CartesHGraph<T, S> implements Nominator<CartesHGraph<T, S>> {
  indices!: HGraph<T, S>;
  abstract type: string;
  abstract value: CartesHGraph<T, S>;

  protected constructor(ns: T[], es: S[]) {
    this.indices = new HGraph(ns, es);
  }
}

export class CartesTimeGraf extends CartesGraf<TimeCoordinate, TimeCoordinate>
  implements Nominator<CartesTimeGraf> {
  type: "CartesTimeGraf" = "CartesTimeGraf";
  value!: CartesTimeGraf;

  constructor(ns: Ts<TimeCoordinate>, es: Ts<TimeCoordinate>) {
    super(ns, es);
    this.value = this;
  }
}

export class CartesTimeHGraph extends CartesHGraph<TimeCoordinate, TimeCoordinate>
  implements Nominator<CartesTimeHGraph> {
  type: "CartesTimeHGraph" = "CartesTimeHGraph";
  value!: CartesTimeHGraph;

  constructor(ns: TimeCoordinate[], es: TimeCoordinate[]) {
    super(ns, es);
    this.value = this;
  }
}


export class CartesSpaceTimeHGraph extends CartesHGraph<CartesTimeHGraph, CartesTimeHGraph> {
  type: "CartesSpaceTimeGraph" = "CartesSpaceTimeGraph";
  value!: CartesHGraph<CartesTimeHGraph, CartesTimeHGraph>;

  constructor(ns: CartesTimeHGraph[], es: CartesTimeHGraph[]) {
    super(ns, es);
    this.value = this;
  }
}

export function hGraph2Graf<A, B>(hGraph: CartesTimeHGraph):  CartesTimeGraf {
  const tns: Ts<TimeCoordinate> = hGraph.indices.nodes.value;
  const tes: Ts<TimeCoordinate> = hGraph.indices.edges.value;
  return  new CartesTimeGraf(tns, tes);
}

export function times2HGraph(stNodes: TimeCoordinate[], stEdges: TimeCoordinate[]): CartesSpaceTimeHGraph {
  const cartesTimeHNEGraph = new CartesTimeHGraph(stNodes, stEdges);
  const cartesTimeHENGraph = new CartesTimeHGraph(stEdges, stNodes);
  return  new CartesSpaceTimeHGraph([cartesTimeHNEGraph], [cartesTimeHENGraph] );
}
