import { ObservableStore } from "@codewithdan/observable-store";
import { GrafInitService, Phoid } from "@cosys/func";
import { Observable, of } from "rxjs";

export enum Actions {
  INIT="INIT",
}

export class GrafStore extends ObservableStore<Phoid> {

  constructor(protected grafInit: GrafInitService) {
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
