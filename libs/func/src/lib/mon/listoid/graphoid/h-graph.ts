import {Listoid} from "../listoid";
import {Ts} from "@cosys/func";


export interface Graph<N, E> {
  readonly nodes: Listoid<N>;
  readonly edges: Listoid<E>;
}

export interface HGraf<N, E> extends Graph<N, E> {
  readonly hEdges: Listoid<Graph<N, E>>;
}

export class HGraph<N, E>
  implements HGraf<N, E> {

  readonly type = "HGraph";

  readonly edges!: Listoid<E>;
  readonly hEdges!: Listoid<HGraf<N, E>>;
  readonly nodes!: Listoid<N>;

  constructor(n: Ts<N>, e: Ts<E>) {
    const edges = new Listoid<E>(e);
    const nodes = new Listoid<N>(n);
    this.edges = edges;
    this.nodes = nodes;
    const graph: Graph<N, E> = { edges, nodes };
    const hEdges = new Listoid([graph]);
    const hEdged: HGraf<N, E> = { ...graph, hEdges };
    this.hEdges = new Listoid([hEdged]);
  }
}


export type Graphoid<N, E> = HGraph<N, (e: E[]) => N[]>;
export function makeGraphoid<N, E>(n: N[], e: E[]): Graphoid<N, E> {
  const proj = (_: E, id: number) => n[id];
  const eToN:  (ez: E[]) => N[] = (ez) => ez.map(proj);
  return new HGraph<N, (e: E[]) => N[]>(n, [(_: E[]) => eToN(e)])
}
