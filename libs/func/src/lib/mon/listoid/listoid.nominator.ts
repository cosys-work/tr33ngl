import { AlphaValued, Nominator } from "../../utils/nominators";


export enum ListoidNom {
  Simple = "Listoid"
}

export class ListoidNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: ListoidNom.Simple = ListoidNom.Simple;
  constructor(t: T) {
    super(t);
  }
}
