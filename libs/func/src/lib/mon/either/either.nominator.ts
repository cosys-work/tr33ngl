import { AlphaValued, is, nominate, Nominator, TValued } from "../../utils/nominators";


export enum EitherNom {
  Left = "Either~Left",
  Right = "Either~Right"
}


export class LeftNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: EitherNom.Left = EitherNom.Left;
}

export class RightNominator<T> extends AlphaValued<T> implements  Nominator<T> {
  type: EitherNom.Right = EitherNom.Right;
}


export function left<T>(v: T): LeftNominator<T> {
  return nominate(EitherNom.Left, v) as LeftNominator<T>;
}

export function right<T>(v: T): RightNominator<T> {
  return nominate(EitherNom.Right, v) as RightNominator<T>;
}


export function isRight<T>(v: TValued<T>): v is RightNominator<T> {
  return is<RightNominator<T>>(v, right(v.value));
}

export function isLeft<T>(v: TValued<T>): v is LeftNominator<T> {
  return is<LeftNominator<T>>(v, left(v.value));
}
