import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EmpTNessService {
  public zerothClones: <T extends ArrayLike<unknown>>(t: T) => T | T[] = (
    t
  ) => {
    const hasLength = t?.length;
    const length: number = hasLength ?? 1;
    return new Array(length).fill(hasLength ? t[0] : t);
  };
}
