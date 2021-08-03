export interface Typed {
  type: string;
}

export interface Valued<T> {
  value: T;
}

export type TValued<T> = Typed & Valued<T>;

export interface Nominator<T> {
  type: string;
  value: T;
}

export function nominate<T>(type: string, value: T): Nominator<unknown> {
  return ({ type, value });
}

export function str<T extends Nominator<unknown>>(v: T): string {
  return v.type;
}

export function is<T extends Nominator<unknown>>(v: TValued<unknown>, ref: T): v is T {
  return v.type === ref.type && v.value === ref.value;
}
