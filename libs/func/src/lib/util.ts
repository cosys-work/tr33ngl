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


export function isnt(u: unknown): boolean {
  return typeof u === prims.undefined;
}

export function isNObj(u: unknown): boolean {
  return typeof u === prims.object;
}

export function isStr(u: unknown): boolean {
  return typeof u === prims.string;
}

export function isBool(u: unknown): boolean {
  return typeof u === prims.boolean;
}

export function isNum(u: unknown): boolean {
  return typeof u === prims.number;
}

export function isBig(u: unknown): boolean {
  return typeof u === prims.bigint;
}

export function isSym(u: unknown): boolean {
  return typeof u === prims.symbol;
}

export function isFun(u: unknown): boolean {
  return typeof u === prims.function;
}

export function is(u: unknown, p: keyof Primitives): boolean {
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
