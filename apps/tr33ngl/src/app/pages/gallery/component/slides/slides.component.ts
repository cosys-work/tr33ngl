import { Component, ViewChild } from "@angular/core";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ThemePalette } from "@angular/material/core";
import { ImgObjSkel8n } from "../../../../shared/models/image.model";
import { ImagesService } from "../../../../shared/services/pages/images.service";
import { NgImageSliderComponent } from "ng-image-slider";

@Component({
  selector: "cosys-slides",
  templateUrl: "./slides.component.html",
  styleUrls: ["./slides.component.scss"],
})
export class SlidesComponent {
  imageObjects: ImgObjSkel8n[];
  currentIndex = 0;

  color: ThemePalette = "primary";
  mode: ProgressBarMode = "determinate";

  bufferValue = 25;

  @ViewChild("nav") slider!: NgImageSliderComponent;

  constructor(private imagesService: ImagesService) {
    this.imageObjects = imagesService.imagesStore.get().currentImages;
  }

  onImageClick(event: number) {
    const activeImageElem: () => HTMLImageElement = () =>
      document.querySelector(
        `img[title='${this.currentIndex}']`
      ) as HTMLImageElement;
    // disable any existing shadow
    // eslint-disable-next-line fp/no-mutation
    activeImageElem().style.boxShadow = "none";
    // change focus to new image
    this.currentIndex = event;
    this.imagesService.restate({ currentIndex: this.currentIndex });
    // enable a new box-shadow using theme green
    // eslint-disable-next-line fp/no-mutation
    activeImageElem().style.boxShadow = `0px 0px 3px 3px var(--clr-color-success-200)`;
  }

  onArrowClick(_: unknown) {
    console.log("arrow clicked");
  }
}
