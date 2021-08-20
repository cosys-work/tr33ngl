import { AlphaValued, Nominator } from "@cosys/func";

export enum GraphoidNom {
  HGraph = "HGraph"
}

export class GraphoidNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: GraphoidNom.HGraph = GraphoidNom.HGraph;
}
