import { PFunc } from "./func/tion/function.defn";

export interface Primitives {
  undefined: "undefined",
  boolean: "boolean",
  number: "number",
  bigint: "bigint",
  string: "string",
  symbol: "symbol",
  function: "function"
}

export const prims: Primitives = {
  undefined: "undefined",
  boolean: "boolean",
  number: "number",
  bigint: "bigint",
  string: "string",
  symbol: "symbol",
  function: "function"
};

export interface NonPrimitives {
  object: "object"
}

export const nonPrims: NonPrimitives = {
  object: "object"
};

export function isnt(u: unknown): u is undefined {
  return typeof u === prims.undefined;
}

export function isNObj(u: unknown): u is object {
  return typeof u === nonPrims.object;
}

export function isNull(u: unknown): u is null {
  return null === u;
}

export function isStr(u: unknown): u is string {
  return typeof u === prims.string;
}

export function isBool(u: unknown): u is boolean {
  return typeof u === prims.boolean;
}

export function isNum(u: unknown): u is number {
  return typeof u === prims.number;
}

export function isBig(u: unknown): u is bigint {
  return typeof u === prims.bigint;
}

export function isSym(u: unknown): u is symbol {
  return typeof u === prims.symbol;
}

export function isFun(u: unknown): boolean {
  return typeof u === prims.function;
}

export function is(u: unknown, p: keyof Primitives): u is typeof p {
  return p === typeof u;
}

export function isPrimitive(u: unknown): false | keyof Primitives {
  const typ = typeof u;
  const l = Object.values(prims);
  const isPrim = l.includes(typ);
  return (isPrim && typ !== nonPrims.object) ? typ : false;
}

export function isNonPrimitive(u: unknown): false | keyof NonPrimitives {
  return isNObj(u) ? nonPrims.object : false;
}

export type Ts<T> = T | T[];

export function gOfF<T, U, V>(f: PFunc<T, U>, g: PFunc<U, V>) {
  return (t: T) => g(f(t));
}

export class AlphaAttribute<U> {
  readonly attrib: unknown;
  constructor(public attr: string, public attribute: U) {
    this.attrib = {
      [attr]: attribute
    };
  }
}

export const newObjWithAttr:
  <T, U>(objekt: T, attr: string, attribute: U, neType?: unknown) => T
  = <T, U>(objekt: T, attr: string, attribute: U) => {
  return  Object.defineProperty(
    objekt,
    attr,
    { value: attribute, writable: false, enumerable: true }
  );
};

export function equivalence<T>(n: any, f: () => T): boolean {
  const props: string[] = Object.keys(f());
  return props.every(n.hasOwnProperty);
}
