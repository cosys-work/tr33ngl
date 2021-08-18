import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { GrafInitService } from "../actions/init/graf-init.service";
import { MetaNetworkState } from "@cosys/func";
import { Observable, of } from "rxjs";

export enum Actions {
  INIT="INIT",
}

@Injectable({
  providedIn: 'root'
})
export class GrafStoreService extends ObservableStore<MetaNetworkState> {

  constructor(protected grafInit: GrafInitService) {
    super({ trackStateHistory: true });
    this.grafInit = grafInit;
    this.setState(this.grafInit.metaState, Actions.INIT);
  }

  get state() {
    return this.getState(true);
  }

  rxtiv(): Observable<MetaNetworkState> {
    return of(this.state);
  }

}
