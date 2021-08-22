import { Val } from "../val/val.defn";

export interface Mappable<T> extends Val<T> {
  map: <U>(
    func: (value: T, index: number, values: T[]) => U
  ) => U[];
  readonly length: number;
}

export function isMappable<T>(
  maybeMappable: any
): maybeMappable is Mappable<T> {
  return maybeMappable?.hasOwnProperty("map")
    && maybeMappable.hasOwnProperty("length");
}

export class Mapper<T> extends Array<T> implements Mappable<T> {
  readonly u!: T;
  readonly length!: number;
  protected readonly mappable!: boolean;

  constructor(v: T) {
    super(v)
    this.u = v;
    this.length = isMappable(v) ? v.length : super.length;
  }

  map<U>(func: (value: T, index: number, values: T[]) => U) : U[] {
    if (isMappable<T>(this.u)) {
      return this.u.map(func);
    } else {
      return [this.u].map(func);
    }
  }
}


