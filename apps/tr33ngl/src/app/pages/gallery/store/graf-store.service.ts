import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { MetaNetworkState } from "../models/h-graph.model";
import { GrafInitService } from "../actions/init/graf-init.service";


@Injectable({
  providedIn: 'root'
})
export class GrafStoreService extends ObservableStore<MetaNetworkState> {

  constructor(protected grafInit: GrafInitService) {
    super({ trackStateHistory: true });
    
  }

}
