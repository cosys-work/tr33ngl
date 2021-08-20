import { AlphaMonad, Listoid, Monadic, Nominator } from "@cosys/func";

export interface Graph<N, E> extends Nominator<Graph<N, E>> {
  readonly nodes: Listoid<N[]>;
  readonly edges: Listoid<E[]>;
}

export const $id = Symbol.for('id');
export const $di = Symbol.for('di');

export interface Nod {
  [key: string]: string;
  [$id]: Partial<Nod>;
  tag: string;
}

export interface Edg extends Partial<Nod> {
  [$id]: Partial<Nod>;
  [$di]: Listoid<Nod>;
  tag: string;
}

export type Nods = Nod[];
export type Edgs = Edg[];

export interface Gra {
  nodes: Nods;
  edges: Edgs;
}

export interface HGraf<N, E> extends Graph<N, E> {
  readonly hEdges: Listoid<Graph<N, E>[]>;
}

export class HGraaff<N, E>
  implements HGraf<N, E> {

  readonly edges!: Listoid<E[]>;
  readonly hEdges!: Listoid<Graph<N, E>[]>;
  readonly nodes!: Listoid<N[]>;

  type: "H~HGraaff" = "H~HGraaff";
  value!: Graph<N, E>;

  constructor(n: N[], e: E[]) {
    this.edges = new Listoid(e);
    this.nodes = new Listoid(n);
  }
}


export class HGraph<N, E>
  extends AlphaMonad<HGraf<N, E>>
  implements Monadic<HGraf<N, E>> {

  readonly type = "HGraph";
  readonly value!: HGraf<N, E>;
  readonly edges!: Listoid<E[]>;
  readonly nodes!: Listoid<N[]>;
  readonly hEdges!: Listoid<HGraf<N, E>>;
  readonly graph!: HGraf<N, E>;

  constructor(n: N[], e: E[]) {
    super(new HGraaff(n, e));
    this.graph = super.value;
    this.value = this.graph;
    this.hEdges = new Listoid(this.graph);
    const eEdges = e.map(
      (_) => this.graph.edges.value
    ).flat();
    const nNodes = n.map(
      (_) => this.graph.nodes.value
    ).flat();
    this.edges = new Listoid(eEdges);
    this.nodes = new Listoid(nNodes);
  }
}

export type Graphoid<N, E> = HGraph<N, (e: E[]) => N[]>;
export function makeGraphoid<N, E>(n: N[], e: E[]): Graphoid<N, E> {
  const proj = (_: E, id: number) => n[id];
  const e2n:  (ez: E[]) => N[] = (ez) => ez.map(proj);
  return new HGraph<N, (e: E[]) => N[]>(n, [(_: E[]) => e2n(e)])
}
