import { Nominator } from "@cosys/func";

export interface NothingNominator extends Nominator<'Nothing'> {
  type: string;
  value: 'Nothing';
}

export interface JustNominator<T> extends Nominator<T> {
  type: string;
  value: T;
}
