import { Listoid, Nominator } from "@cosys/func";

export interface Graph<N, E> extends Nominator<Graph<N, E>> {
  readonly nodes: Listoid<N[]>;
  readonly edges: Listoid<E[]>;
}

export interface HGraf<N, E> {
  readonly nodes: Listoid<N[]>;
  readonly edges: Listoid<E[]>;

  readonly hEdges: Listoid<Graf<N, E>[]>;
}

export class Graf<N, E> implements Graph<N, E> {
  readonly edges: Listoid<E[]>;
  readonly nodes: Listoid<N[]>;

  type: "Graf" = "Graf";
  value!: Graph<N, E>;

  constructor(n: N[], e: E[]) {
    this.edges = new Listoid(e);
    this.nodes = new Listoid(n);
    this.value = this;
  }
}

export class HGraph<N, E> implements HGraf<N, E>, Graph<N, E> {
  readonly edges!: Listoid<E[]>;
  readonly nodes!: Listoid<N[]>;

  readonly hEdges!: Listoid<Graf<N, E>[]>;

  readonly graph!: Graf<N, E>;

  readonly type = "HGraph";
  readonly value!: Graf<N, E>;

  constructor(n: N[], e: E[]) {
    this.graph = new Graf(n, e);
    this.hEdges = new Listoid([this.graph]);

    const eEdges = e.map((_) => this.graph.edges.value).flat();
    const nNodes = n.map((_) => this.graph.nodes.value).flat();

    this.edges = new Listoid(eEdges);
    this.nodes = new Listoid(nNodes);
    this.value = this.graph;
  }
}

export type Graphoid<N, E> = HGraph<N, (e: E[]) => N[]>;

export function makeGraphoid<N, E>(n: N[], e: E[]): Graphoid<N, E> {
  const proj = (_: E, id) => n[id];
  const e2n:  (ez: E[]) => N[] = (ez) => ez.map(proj);
  return new HGraph<N, (e: E[]) => N[]>(n, [(_: E[]) => e2n(e)])
}
