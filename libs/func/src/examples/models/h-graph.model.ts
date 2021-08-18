import { Edg, Gra, Graphoid, HGraph, Listoid, Nod } from "@cosys/func";

export interface HNode extends Nod {
  id: string;
  label: string;
  title: string;
}

export interface HEdge extends Nod, Edg {
  from: string;
  to: string;
}

export type HNodes = Listoid<HNode[]>;
export type HEdges = Listoid<HEdge[]>;
export interface HGGraph extends Gra {
  nodes: HNodes;
  edges: HEdges;
}

export type Phoid = Graphoid<HNode, HEdge>;
export interface GraphoidInit {
  graph: HGGraph;
  maker: Partial<GraphoidInit>;
  oid: Phoid;
}

export type GeeRaph = HGraph<HNode, HEdge>;
export interface GraphoidFromHG extends GraphoidInit {
  init: GraphoidInit;
  hg: GeeRaph;
  raph: Phoid;
}

export type MeGraPhoid = Graphoid<HNode, HEdge>;
export interface MetaNetworkState {
  graph: MeGraPhoid;
}
