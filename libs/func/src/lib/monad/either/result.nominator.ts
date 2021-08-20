import { AlphaValued, Nominator } from "@cosys/func";

export enum ResultNom {
  Fail = "Result~Fail",
  Pass = "Result~Pass"
}

export class FailNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: ResultNom.Fail = ResultNom.Fail;
}

export class PassNominated<T> extends AlphaValued<T> implements Nominator<T> {
  type: ResultNom.Pass = ResultNom.Pass;
}
