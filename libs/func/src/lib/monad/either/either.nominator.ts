import { AlphaValued, Nominator } from "@cosys/func";

export enum EitherNom {
  Left = "Either~Left",
  Right = "Either~Right"
}

export class LeftNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: EitherNom.Left;
}

export class RightNominator<T> extends AlphaValued<T> implements  Nominator<T> {
  type: EitherNom.Right;
}
