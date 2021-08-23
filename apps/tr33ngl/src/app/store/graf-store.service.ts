import { ObservableStore } from "@codewithdan/observable-store";

import { Observable, of } from "rxjs";
import { HGDefault } from "@cosys/func";
import { Injectable } from "@angular/core";
import { GrafInitService } from "./init/graf-init.service";


export enum Actions {
  INIT="INIT",
}

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<HGDefault> {

  constructor(protected grafInit: GrafInitService) {
    super({ trackStateHistory: true });
    this.grafInit = grafInit;
    this.setState(this.grafInit.hGraph, Actions.INIT);
  }

  get state() {
    return this.getState(true);
  }

  rxtiv(): Observable<HGDefault> {
    return of(this.state);
  }

}
