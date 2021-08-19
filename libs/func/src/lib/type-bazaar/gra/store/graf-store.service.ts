import { ObservableStore } from "@codewithdan/observable-store";
import { GrafInit } from "../actions/init/graf-init.service";
import { Phoid } from "@cosys/func";
import { Observable, of } from "rxjs";

export enum Actions {
  INIT="INIT",
}

export class GrafStore extends ObservableStore<Phoid> {

  constructor(protected grafInit: GrafInit) {
    super({ trackStateHistory: true });
    this.grafInit = grafInit;
    this.setState(this.grafInit.metaState, Actions.INIT);
  }

  get state() {
    return this.getState(true);
  }

  rxtiv(): Observable<Phoid> {
    return of(this.state);
  }

}
