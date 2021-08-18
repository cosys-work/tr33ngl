import { Edg, Gra, Graphoid, HGraph, Listoid, Nod } from "@cosys/func";

export interface Node extends Nod {
  id: string;
  label: string;
  title: string;
}

export interface Edge extends Nod, Edg {
  from: string;
  to: string;
}

export type Nodes = Listoid<Node[]>;
export type Edges = Listoid<Edge[]>;
export interface Graph extends Gra {
  nodes: Nodes;
  edges: Edges;
}

export type Phoid = Graphoid<Node, Edge>;
export interface GraphoidInit {
  graph: Graph;
  maker: Partial<GraphoidInit>;
  oid: Phoid;
}

export type GeeRaph = HGraph<Node, Edge>;
export interface GraphoidFromHG extends GraphoidInit {
  init: GraphoidInit;
  hg: GeeRaph;
  raph: Phoid;
}

export type MeGraPhoid = Graphoid<Nodes, Edges>;
export interface MetaNetworkState {
  graph: MeGraPhoid;
}
