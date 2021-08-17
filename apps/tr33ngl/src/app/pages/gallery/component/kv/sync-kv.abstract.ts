import { IContent } from "../../../../shared/models/pages-manifest.model";
import { ImagesStore } from "../../../../shared/stores/images.store";
import { PagesManifestService } from "../../../../shared/services/pages/pages-manifest.service";
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  template: "",
})
export abstract class SyncKVComponent implements OnInit, OnDestroy {
  public keySteps: IContent = {
    deck: 0,
    keys: [["", ""]],
    duals: [["", "", ""]],
  };

  private subscriptions = new Subscription();

  protected constructor(
    private imagesStore: ImagesStore,
    private pagesManifest: PagesManifestService
  ) {
    this.syncContentWithCursor();
  }

  syncContentWithCursor() {
    const currentIndex = this.imagesStore.get()?.currentIndex ?? 0;
    const contentHasCurrentIndex =
      this.pagesManifest.content.length >= currentIndex;
    this.keySteps =
      this.pagesManifest.content[contentHasCurrentIndex ? currentIndex : 0];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.imagesStore.stateChanged.subscribe(() =>
        this.syncContentWithCursor()
      )
    );
  }
}

export class SyncKVComponentStub extends SyncKVComponent {}
