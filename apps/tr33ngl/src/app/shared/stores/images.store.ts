import { ObservableStore } from "@codewithdan/observable-store";
import { ImgGridState } from "../models/image.model";
import { Storable } from "../models/stored.model";
import { Injectable } from "@angular/core";

const ADD_ACTION = "ADD_IMG_GRID_STATE";

@Injectable({
  providedIn: "root",
})
export class ImagesStore
  extends ObservableStore<ImgGridState>
  implements Storable<ImgGridState>
{
  add(tate: Partial<ImgGridState>): ImgGridState {
    const state = this.getState();
    const sanitizedTate = Object.assign({}, tate);
    return this.setState({ ...state, ...sanitizedTate }, ADD_ACTION);
  }

  get(): ImgGridState {
    return this.getState();
  }

  constructor() {
    super({ trackStateHistory: true });
  }
}
