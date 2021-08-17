import { Graphoid, Listoid } from "@cosys/func";

export interface Nodes extends Array<unknown> {
  nodes: Listoid<unknown[]>;
}

export interface Edges extends Array<unknown> {
  edges: Listoid<unknown[]>;
}

export interface Graph extends Nodes, Edges {
  nodes: Listoid<Nodes[]>;
  edges: Listoid<Edges[]>;
}

export interface MetaNetworkState extends Edges, Nodes {
  graph: Graphoid<Nodes, Edges>;
}
