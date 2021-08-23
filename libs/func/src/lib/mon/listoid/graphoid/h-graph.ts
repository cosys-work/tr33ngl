import { Listoid } from "../listoid";
import { AlphaMonad } from "../../../alpha/monad";
import { Monadic } from "@cosys/func";


export interface Graph<N, E> {
  readonly nodes: Listoid<N[]>;
  readonly edges: Listoid<E[]>;
}

export interface HGraf<N, E> extends Graph<N, E> {
  readonly hEdges: Listoid<Graph<N, E>[]>;
}

export class HGraaff<N, E>
  implements HGraf<N, E> {

  readonly edges!: Listoid<E[]>;
  readonly hEdges!: Listoid<HGraf<N, E>[]>;
  readonly nodes!: Listoid<N[]>;

  constructor(n: N[], e: E[]) {
    const edges = new Listoid(e);
    const nodes = new Listoid(n);
    this.edges = edges;
    this.nodes = nodes;

    const graph: Graph<N, E> = { edges, nodes };
    const hEdges = new Listoid([graph]);
    const hEdged: HGraf<N, E> = { ...graph, hEdges };
    this.hEdges = new Listoid([hEdged]);
  }
}


export class HGraph<N, E>
  extends AlphaMonad<Graph<N, E>>
  implements Monadic<Graph<N, E>> {

  readonly type = "HGraph";
  readonly graph!: Graph<N, E>;

  readonly edges!: Listoid<E[]>;
  readonly nodes!: Listoid<N[]>;
  readonly hEdges!: Listoid<HGraf<N, E>[]>;

  constructor(n: N[], e: E[]) {
    super({ nodes: new Listoid(n), edges: new Listoid(e) });
    this.graph = super.u;
    const hGra = new HGraaff(n, e);
    this.hEdges = hGra.hEdges;
    this.edges = hGra.edges;
    this.nodes = hGra.nodes;
  }
}

export type Graphoid<N, E> = HGraph<N, (e: E[]) => N[]>;
export function makeGraphoid<N, E>(n: N[], e: E[]): Graphoid<N, E> {
  const proj = (_: E, id: number) => n[id];
  const e2n:  (ez: E[]) => N[] = (ez) => ez.map(proj);
  return new HGraph<N, (e: E[]) => N[]>(n, [(_: E[]) => e2n(e)])
}
