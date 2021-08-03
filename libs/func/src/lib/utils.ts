import { FuncMappable, Mappable } from "./mappable";


function isArray(maybeArray: Array<unknown> | unknown): maybeArray is Array<unknown> {
  return !!maybeArray.hasOwnProperty("length") && typeof maybeArray !== "string";
}

//**
// const toFlatten = [["A", ["B", "C"], "D"], "E", "F"];
// console.log("toFlatten", toFlatten);
// console.log("flatter", flattener(toFlatten));
// *
export function flattener(nested: Array<unknown> | unknown): Array<unknown> {
  if (!nested) return;
  const tArray: Array<unknown> = [];
  if (isArray(nested)) {
    const isArrayElem = nested.map(isArray);
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

export function flatten<T>(nest: Array<T> | T): Array<T> {
  return flattener(nest as Array<unknown>) as Array<T>;
}

export function flatten2<T>(nest: Array<Array<unknown>>): Array<T> {
  return flattener(nest) as Array<T>;
}

export function isMappable(
  maybeMapped: Array<unknown> | Mappable<any> | FuncMappable<any> | unknown
): maybeMapped is Mappable<unknown> | FuncMappable<unknown> | Array<unknown> {
  return maybeMapped.hasOwnProperty("map")
}

