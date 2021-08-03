import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

const createBehaviorBroker: <T>(t: T) => BehaviorSubject<T> = <T>(t: T) =>
  new BehaviorSubject<typeof t>(t);

export function createBSubSubscript<T>(
  pipeable: Observable<T>,
  initializer: BehaviorSubject<T>
) {
  const initial = new BehaviorSubject<T>(initializer.value);
  return () => pipeable.pipe(map((atom) => initial.next(atom)));
}

export function createBSubSubscriptFrom<T>(behaviorSub: BehaviorSubject<T>) {
  const initialBSub = new BehaviorSubject<T>(behaviorSub.value);
  return () => behaviorSub.pipe(map((atom) => initialBSub.next(atom)));
}

@Injectable({
  providedIn: "root",
})
export class RxtivityService {
  public createBehaviorBroker: <T>(t: T) => BehaviorSubject<T> = <T>(t: T) =>
    createBehaviorBroker(t);

  public createSubscript<T>(
    pipeline: Observable<T>,
    initializer: BehaviorSubject<T>
  ) {
    return createBSubSubscript<T>(pipeline, initializer);
  }

  public createSubscriptFrom<T>(behaviorSub: BehaviorSubject<T>) {
    return createBSubSubscriptFrom<T>(behaviorSub);
  }
}
