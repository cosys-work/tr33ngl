import {equivalence, Listoid, Ts} from "@cosys/func";

export interface Noded<N> {
  readonly nodes: Listoid<N>;
}

export interface HyperNoded<N> {
  readonly hyperNodes: Listoid<Noded<N> | HyperNoded<N>>;
}

export interface Edged<E> {
  readonly edges: Listoid<E>;
}

export interface HyperEdged<E> {
  readonly hyperEdges: Listoid<Edged<E> | HyperEdged<E>>;
}

export function noded<N>(n: Ts<N>): Noded<N> {
  return ({nodes: new Listoid<N>(n)});
}

export function edged<E>(e: Ts<E>): Edged<E> {
  return ({edges: new Listoid<E>(e)});
}


export function isNoded<N>(a: any, n: N): a is Noded<N> {
  return equivalence(a, () => noded(n));
}

export function isEdged<E>(a: any, e: E): a is Edged<E> {
  return equivalence(a, () => edged(e));
}

export function hyperNoded<N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>): HyperNoded<N> {
  return ({ hyperNodes: new Listoid(n) });
}

export function hyperEdged<N>(e: Ts<Edged<N>> | Ts<HyperEdged<N>>): HyperEdged<N> {
  return ({ hyperEdges: new Listoid(e) });
}

export function isHyperNoded<N>(a: any, n: N): a is HyperNoded<N> {
  return equivalence(a, () => hyperNoded(noded(n)));
}

export function isHyperEdged<N>(a: any, n: N): a is Edged<N> {
  return equivalence(a, () => hyperEdged(edged(n)));
}

export interface HyperGraph<N, E>
  extends Partial<Noded<N>>, HyperNoded<N>, Partial<Edged<E>>, HyperEdged<E> {}

export function hyperGraphical<N, E>(hyperNodes: HyperNoded<N>, hyperEdges: HyperEdged<E>):
  HyperGraph<N, E> {
  return ({ ...hyperNodes, ...hyperEdges });
}

export const hGFromTs: <N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>) =>
  <E>(e: Ts<Edged<E>> | Ts<HyperEdged<E>>) =>
    HyperGraph<N, E>
  = <N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>) =>
  <E>(e: Ts<Edged<E>> | Ts<HyperEdged<E>>) =>
    hyperGraphical(hyperNoded(n), hyperEdged(e));

export const hyper:
  <N>(n: Ts<N>) =>
    <E>(e: Ts<E>) =>
      HyperGraph<N, E> =
  <N>(n: Ts<N>) =>
    <E>(e: Ts<E>) =>
      hGFromTs(noded(n))(edged(e));

export const hyperGraph:
  <N>(n: Ts<N>) =>
    <E>(e: Ts<E>) =>
      (hN: HyperNoded<N>) =>
        (hE: HyperEdged<E>) =>
          HyperGraph<N, E> =
  <N>(n: Ts<N>) =>
    <E>(e: Ts<E>) =>
      (hN: HyperNoded<N>) =>
        (hE: HyperEdged<E>) => {
          return ({
            nodes: new Listoid(n),
            edges: new Listoid(e),
            hyperNodes: new Listoid(hN),
            hyperEdges: new Listoid(hE)
          });
        };
