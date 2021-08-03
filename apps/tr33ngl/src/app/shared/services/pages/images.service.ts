import { Injectable } from "@angular/core";
import {
  ImgDeckStateMachine,
  ImgGridState,
  ImgObjSkel8n,
} from "../../models/image.model";
import { from, Observable } from "rxjs";
import { RxtivityService } from "../../utils/rxtivity.service";
import { ImageUtilsService } from "../../utils/image-utils.service";
import { ImagesStore } from "../../stores/images.store";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  constructor(
    private rxtivity: RxtivityService,
    private imageUtils: ImageUtilsService,
    public imagesStore: ImagesStore
  ) {
    this.imagesStore.add(
      new ImgDeckStateMachine(this.imageUtils.imageObjects(20))
    );
  }

  public upcomingImageObjects: () => Observable<ImgObjSkel8n[]> = () => {
    const { currentIndex, currentImages } = this.imagesStore.get();
    const upcoming = [
      currentImages?.filter((_, index) => index >= currentIndex),
    ];
    return from(upcoming);
  };

  public restate(newStatePatch: Partial<ImgGridState>): ImgGridState {
    return this.imagesStore.add(newStatePatch);
  }
}
