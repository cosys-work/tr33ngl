import { Injectable } from "@angular/core";

// eslint-disable-next-line fp/no-rest-parameters
type Constructor<T> = { new (...args: never[]): T };

export type PrimitiveOrConstructor<T> =
  | Constructor<T>
  | "string"
  | "number"
  | "boolean";

function typeGuard<T>(
  o: unknown,
  className: PrimitiveOrConstructor<T>
): o is T {
  if (typeof className === "string") {
    return typeof o === className;
  }
  return o instanceof className;
}

@Injectable({
  providedIn: "root",
})
export class TypeGuardsService {
  public typeGuard<T>(
    o: unknown,
    className: PrimitiveOrConstructor<T>
  ): o is T {
    return typeGuard(o, className);
  }
}
