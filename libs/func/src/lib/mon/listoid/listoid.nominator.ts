import { AlphaValued, Nominator } from "../../utils/nominators";
import {Ts} from "../../util";


export enum ListoidNom {
  Simple = "Listoid"
}

export class ListoidNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: ListoidNom.Simple = ListoidNom.Simple;
  constructor(t: Ts<T>) {
    super(t);
  }
}
