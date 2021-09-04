import {AlphaValued, isNomT, nominate, Nominator, TValued} from "../../utils/nominators";
import {isMappable} from "../../map/umap.defn";


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

export function getV<T>(v: TValued<T>): T[] | TValued<T> {
  return isMappable(v.value) ? v.value.map(_ => _) : v;
}

export function isRight<T>(v: TValued<T>): v is RightNominator<T> {
  const valhalla: T[] | TValued<T> = getV(v);
  return isNomT(v, right(valhalla));
}

export function isLeft<T>(v: TValued<T>): v is LeftNominator<T> {
  const valhalla: T[] | TValued<T> = getV(v);
  return isNomT(v, left(valhalla));
}
