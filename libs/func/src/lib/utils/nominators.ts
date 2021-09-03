import {equivalence, Ts} from "@cosys/func";

export interface Typed {
  type: string;
}

export interface Valued<T> {
  value: T;
}

export function unwrapVal<T>(i: Valued<T>): T {
  return i.value;
}

export function makeVal<T>(value: T): Valued<T> {
  return ({
    value
  })
}

export interface Nominator<T> extends Typed, Valued<Ts<T>> {}


export function nominate<T>(type: string, value: T): Nominator<T> {
  return ({ type, value });
}

export abstract class AlphaValued<T> {
  readonly value!: Ts<T>;

  protected constructor(v: Ts<T>) {
    this.value = v;
  }
}

export abstract class AlphaNomNom<T> extends AlphaValued<T> implements Nominator<T> {
  readonly type!: string;
  protected constructor(value: Ts<T>) {
    super(value);
    this.type = typeof value;
  }
}

export type TValued<T> = AlphaNomNom<T>;


export function name<T extends Nominator<unknown>>(v: T): string {
  return v.type.toString();
}

export function isNomT<T extends Nominator<unknown>>(v: AlphaNomNom<unknown>, ref: T): v is T {
  return v.type === ref.type && equivalence(v, () => ref);
}

export function isEqual<T extends Nominator<unknown>>(v: AlphaNomNom<unknown>, ref: T): v is T {
  return isNomT(v, ref) && v.value === ref.value;
}
