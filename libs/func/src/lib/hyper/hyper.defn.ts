import {Listoid, Ts} from "@cosys/func";

export interface Noded<N> {
  readonly nodes: Listoid<N>;
}

export function isNoded<N>(n: any): n is Noded<N> {
  return n.hasOwnProperty("nodes");
}

export interface Edged<E> {
  readonly edges: Listoid<E>;
}

export function isEdged<N>(n: any): n is Edged<N> {
  return n.hasOwnProperty("edges");
}

export function noded<N>(n: Ts<N>): Noded<N> {
  return ({ nodes: new Listoid<N>(n)});
}

export function edged<E>(e: Ts<E>): Edged<E> {
  return ({ edges: new Listoid<E>(e) });
}

export interface HyperNoded<N> {
  readonly hyperNodes: Listoid<Noded<N> | HyperNoded<N>>;
}

export function hyperNoded<N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>): HyperNoded<N> {
  return ({ hyperNodes: new Listoid(n) })
}

export interface HyperEdged<E> {
  readonly hyperEdges: Listoid<Edged<E> | HyperEdged<E>>;
}

export function hyperEdged<N>(e: Ts<Edged<N>> | Ts<HyperEdged<N>>): HyperEdged<N> {
  return ({ hyperEdges: new Listoid(e) });
}

export interface HyperGraph<N, E> {
  readonly hN: HyperNoded<N>;
  readonly hE: HyperEdged<E>;
}

export function hyperGraphical<N, E>(hN: HyperNoded<N>, hE: HyperEdged<E>): HyperGraph<N, E> {
  return ({ hN, hE });
}

export const hG: <N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>) =>
  <E>(e: Ts<Edged<E>> | Ts<HyperEdged<E>>) =>
    HyperGraph<N, E>
  = <N>(n: Ts<Noded<N>> | Ts<HyperNoded<N>>) =>
  <E>(e: Ts<Edged<E>> | Ts<HyperEdged<E>>) =>
    hyperGraphical(hyperNoded(n), hyperEdged(e));
