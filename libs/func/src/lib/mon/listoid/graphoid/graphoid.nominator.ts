import { AlphaValued, nominate, Nominator } from "../../../utils/nominators";
import { Graphoid, HGraph } from "./h-graph";


export enum GraphoidNom {
  HGra = "H~HGraph",
  GPhoid = "H~Graphoid"
}

export abstract class HGraphNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: GraphoidNom.HGra = GraphoidNom.HGra;
}

export abstract class GraphoidNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: GraphoidNom.GPhoid = GraphoidNom.GPhoid;
}

export function hGraph<N, E>(v: HGraph<N, E>): HGraphNominator<HGraph<N, E>> {
  return nominate(GraphoidNom.HGra, v) as HGraphNominator<HGraph<N, E>>
}

export function graphoid<N, E>(v: Graphoid<N, E>): GraphoidNominator<Graphoid<N, E>> {
  return nominate(GraphoidNom.GPhoid, v) as GraphoidNominator<Graphoid<N, E>>;
}
