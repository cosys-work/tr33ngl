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

export class HGraph<N, E> extends Graf<N, E> implements HGraf<N, E> {
  readonly edges!: Listoid<E[]>;
  readonly nodes!: Listoid<N[]>;

  readonly hEdges!: Listoid<Graf<N, E>[]>;

  constructor(e: Graf<N, E>[]) {
    super(
      e.map((val) => val.nodes.value).flat(),
      e.map((val) => val.edges.value).flat()
    );
    this.hEdges = new Listoid(e);

    const eEdges = e.map((graf) => graf.edges.value).flat();
    const nNodes = e.map((graf) => graf.nodes.value).flat();

    this.edges = new Listoid(eEdges);
    this.nodes = new Listoid(nNodes);
  }
}
