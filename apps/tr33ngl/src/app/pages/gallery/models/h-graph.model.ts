import { Graphoid, Listoid } from "@cosys/func";

export interface Node {
  id: string;
  label: string;
  title: string;
}

export interface Edge extends Partial<Node> {
  from: string;
  to: string;
}

export type Nodes = Listoid<Node[]>;

export type Edges = Listoid<Edge[]>;

export interface Graph {
  nodes: Nodes;
  edges: Edges;
}

export interface MetaNetworkState {
  graph: Graphoid<Nodes, Edges>;
}
