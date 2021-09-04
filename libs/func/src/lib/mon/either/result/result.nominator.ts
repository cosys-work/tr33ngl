import {AlphaValued, isNomT, nominate, Nominator} from "../../../utils/nominators";

export enum ResultNom {
  Passed = "Result~Pass",
  Failed = "Result~Fail"
}


export abstract class PassNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: ResultNom.Passed = ResultNom.Passed;
}

export abstract class FailNominator<T> extends AlphaValued<T> implements Nominator<T> {
  type: ResultNom.Failed = ResultNom.Failed;
}


export function pass<T>(v: T): PassNominator<T> {
  return nominate(ResultNom.Passed, v) as PassNominator<T>;
}

export function fail<T>(v: T): FailNominator<T> {
  return nominate<T>(ResultNom.Failed, v) as FailNominator<T>;
}


export function passed<T>(v: any): v is PassNominator<T> {
  return isNomT(v, pass(v));
}

export function failed<T>(v: any): v is FailNominator<T> {
  return isNomT(v, fail(v));
}
