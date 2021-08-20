import { AlphaValued, Nominator } from "@cosys/func";

export enum ListoidNom {
  Simple = "Listoid"
}

export class ListoidNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: ListoidNom.Simple = ListoidNom.Simple;
}
