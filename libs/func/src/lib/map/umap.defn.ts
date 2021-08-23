import { Func } from "../func/tion/function.defn";
import { Ts } from "../util";

export interface Mappable<T> {
  readonly length: number;
  map: <U>(
    func: Func<T, U>
  ) => Ts<U>;
}

export function isMappable<T>(
  maybeMappable: any
): maybeMappable is Mappable<T> {
  return maybeMappable?.hasOwnProperty("map")
    && maybeMappable.hasOwnProperty("length");
}

export class UMapper<T> {
  readonly u!: T;
  readonly uArr!: T[]
  readonly length!: number;
  readonly singleton!: boolean;

  constructor(v: Ts<T>) {
    if (isMappable(v)) {
      this.u = v[0];
      this.uArr = v;
    } else {
      this.u = v;
      this.uArr = Array(1).fill(v);
    }
    this.length = this.uArr.length;
    this.singleton = this.length > 1;
  }


  map<U>(func: Func<T, U>) : Ts<U> {
     return this.singleton ? this.mapInner(func)[0] : this.mapInner(func);
  }

  private mapInner<U>(
    func: Func<T, U>
  ): U[] {
    return this.uArr.map(func);
  }
}


