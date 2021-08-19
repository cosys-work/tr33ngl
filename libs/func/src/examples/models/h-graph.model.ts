import { Edg, Gra, Graphoid, HGraph, Listoid, Nod } from "@cosys/func";

export interface HNode extends Nod {
  id: string;
  label: string;
  title: string;
}

export interface HEdge extends Nod, Edg {
  at: string;
  from: string;
  to: string;
}

export type HNodes = Listoid<HNode[]>;
export type HEdges = Listoid<HEdge[]>;
export interface HGGraph extends Gra {
  nodes: HNodes;
  edges: HEdges;
  levi: HGGraph;
}

export type Phoid = Graphoid<HNode, HEdge>;
export interface GraphoidInit {
  graph: HGGraph;
  maker: Partial<GraphoidInit>;
  oid: Phoid;
}

export type GeeRaPh = HGraph<HNode, HEdge>;
export interface GeeRaPhoid extends GraphoidInit {
  init: Partial<GraphoidInit>;
  hg: GeeRaPh;
  raph: Phoid;
}
