import { FuncMappable, Mappable } from "./mappable";


function isArray(maybeArray: Array<unknown> | string | number): maybeArray is Array<string | number> {
  return maybeArray.hasOwnProperty("length") && maybeArray.hasOwnProperty("map");
}


const toFlatten = [["A", ["B", "C"], "D"], "E", "F"];
console.log("toFlatten", toFlatten);
console.log("flatter", flattener(toFlatten));

export function flattener(nested: Array<unknown> | string | number): Array<unknown> {
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
  return flattener(nest as Array<any>) as Array<T>;
}

export function flatten2<T>(nest: Array<Array<unknown>>): Array<T> {
  return flattener(nest as Array<any>) as Array<T>;
}

export function isMappable(
  maybeMapped: Array<unknown> | Mappable<any> | FuncMappable<any>
): maybeMapped is Mappable<unknown> | FuncMappable<unknown> | Array<unknown> {
  return maybeMapped?.hasOwnProperty("map")
}

