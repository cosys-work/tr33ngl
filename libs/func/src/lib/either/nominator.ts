import { Nominator } from "../nominators";

export interface LeftNominator<T> extends Nominator<T> {
  type: 'Left';
  value: T;
}

export interface RightNominator<T> extends Nominator<T> {
  type: 'Right';
  value: T;
}
