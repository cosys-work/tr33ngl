import { Component, OnDestroy, OnInit } from "@angular/core";
import { ImagesStore } from "../../shared/stores/images.store";
import { ImagesService } from "../../shared/services/pages/images.service";
import { Subscription } from "rxjs";

@Component({
  selector: "cosys-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit, OnDestroy {
  images = this.imagesService.upcomingImageObjects();
  private subscriptions!: Subscription;

  constructor(
    private imagesStore: ImagesStore,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.subscriptions = this.imagesStore.stateChanged.subscribe((_) => {
      this.images = this.imagesService.upcomingImageObjects();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
