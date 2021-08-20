import { AlphaValued, is, nominate, Nominator, TValued } from "@cosys/func";

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


export function passed<T>(v: TValued<T>): v is FailNominator<T> {
  return is<FailNominator<T>>(v, fail(v.value));
}

export function failed<T>(v: TValued<T>): v is PassNominator<T> {
  return is<PassNominator<T>>(v, pass(v.value));
}
