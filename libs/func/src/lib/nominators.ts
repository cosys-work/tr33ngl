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

// same types, use whichever you prefer
export type TValued<T> = Typed & Valued<T>;
export interface Nominator<T> extends Typed, Valued<T> {}
//

export function nominate<T>(type: string, value: T): Nominator<T> {
  return ({ type, value });
}

export function str<T extends Nominator<unknown>>(v: T): string {
  return v.type.toString();
}

export function is<T extends Nominator<unknown>>(v: TValued<unknown>, ref: T): v is T {
  return v.type === ref.type;
}

export function isEqual<T extends Nominator<unknown>>(v: TValued<unknown>, ref: T): v is T {
  return v.type === ref.type && v.value === ref.value;
}
