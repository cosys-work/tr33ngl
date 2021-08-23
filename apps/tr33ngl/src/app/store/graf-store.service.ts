import { ObservableStore } from "@codewithdan/observable-store";

import { Observable, of } from "rxjs";
import { Phoid, GrafInitService } from "@cosys/func";
import { Injectable } from "@angular/core";


export enum Actions {
  INIT="INIT",
}

@Injectable({
  providedIn: "root",
})
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
