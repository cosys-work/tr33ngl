import { AlphaValued, isNomT, nominate, Nominator, TValued } from "../../../utils/nominators";
import {isMappable} from "../../../map/umap.defn";


export enum MaybeNom {
  None = "None",
  Just = "Just"
}


export abstract class NothingNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: MaybeNom.None = MaybeNom.None;
}

export abstract class JustNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: MaybeNom.Just = MaybeNom.Just;
}


export function nothing<T>(v?: T): NothingNominator<T> {
  return nominate(MaybeNom.None, v) as NothingNominator<T>;
}

export function just<T>(v: T): JustNominator<T> {
  return nominate(MaybeNom.Just, v) as JustNominator<T>;
}


export function isNothing<T>(v: TValued<unknown>): v is NothingNominator<T> {
  return isNomT<NothingNominator<T>>(v, nothing());
}

export function isJust<T>(v: TValued<T>): v is JustNominator<T> {
  const valhalla: T[] | TValued<T> = isMappable(v.value) ?  v.value.map(_=>_) : v;
  return isNomT(v, just(valhalla));
}
