import {ObservableStore} from "@codewithdan/observable-store";

import {Observable, ReplaySubject} from "rxjs";
import {HEdge, HGDefault, HGraph, HNode} from "@cosys/func";
import {Injectable} from "@angular/core";
import {GrafInitService} from "./init/graf-init.service";


export enum Actions {
  INIT="INIT",
  REINIT="REINIT",
  EDIT="EDIT"
}

const bufferSize = 100;

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<HGDefault> {

  protected storeStream = new ReplaySubject<HGDefault>(bufferSize);

  constructor(protected grafInit: GrafInitService) {
    super({ trackStateHistory: true });
    this.setState(this.grafInit.hGraph, Actions.INIT);
    this.updateStoreStream();
  }

  private updateStoreStream() {
    this.storeStream.next(this.getState(true));
  }

  get state() {
    return this.getState(false);
  }

  set reset(hgDef: HGraph<HNode, HEdge>) {
    this.setState(hgDef, Actions.REINIT);
    this.updateStoreStream();
  }

  set edit(part: Partial<HGDefault>) {
    const newState = { ...this.getState(true), ...part };
    this.setState(newState, Actions.EDIT);
    this.updateStoreStream();
  }

  rxtiv(): Observable<HGDefault> {
    return this.storeStream.asObservable();
  }

}
