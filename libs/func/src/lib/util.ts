export interface Primitives {
  undefined: "undefined",
  object: "object",
  boolean: "boolean",
  number: "number",
  bigint: "bigint",
  string: "string",
  symbol: "symbol",
  function: "function"
}

export const prims: Primitives = {
  undefined: "undefined",
  object: "object",
  boolean: "boolean",
  number: "number",
  bigint: "bigint",
  string: "string",
  symbol: "symbol",
  function: "function"
}


export function isnt(u: unknown): u is undefined {
  return typeof u === prims.undefined;
}

export function isNObj(u: unknown): u is object {
  return typeof u === prims.object;
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

export function id<T>(u:T): T { return u; }

export function isPrimitive(u: unknown): false | keyof Primitives {
  const typ = typeof u;
  const l = Object.values(prims);
  const isPrim = l.includes(typ);
  return isPrim ? typ : false;
}

export type Ts<T> = T | T[];

export const newObj = <T>(data: T) => {
  const origData: any = data;
  Object.keys(origData)
    .forEach(
      (key) => Object.defineProperty(
        data,
        key,
        { get: () => origData[key] }
      )
    );
  return data;
}

