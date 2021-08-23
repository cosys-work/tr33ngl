import { Mappable } from "@cosys/func";

export function isPrimitiveArray(maybeArray: any): maybeArray is Array<string | number> {
  return maybeArray?.hasOwnProperty("length") && maybeArray?.hasOwnProperty("map");
}

export function isNullish(t: unknown): boolean {
  return t === undefined || t === null;
}

export function flattener(nested: Array<unknown> | string | number): Array<unknown> {
  const tArray: Array<unknown> = [];
  if (isPrimitiveArray(nested)) {
    const isArrayElem = nested.map(isPrimitiveArray);
    isArrayElem
      .forEach(
        (arrOrNot, index) => {
          arrOrNot ?
            tArray.push(...flattener(nested[index])) :
            tArray.push(nested[index]);
        }
      )
    return tArray;
  } else {
    return [nested];
  }
}

export function flatten<T>(nest: Array<unknown> | unknown): Array<T> {
  return flattener(nest as Array<any>) as Array<T>;
}

export function flatten2<T>(nest: Array<Array<any>>): Array<T> {
  return flattener(nest as Array<any>) as Array<T>;
}

export function isMappable<T>(
  maybeMapped: any
): maybeMapped is Mappable<T> {
  return maybeMapped?.hasOwnProperty("map") && maybeMapped.hasOwnProperty("length");
}

