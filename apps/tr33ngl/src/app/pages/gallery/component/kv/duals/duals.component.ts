import { Component, OnDestroy, OnInit } from "@angular/core";
import { ImagesStore } from "../../../../../shared/stores/images.store";
import { PagesManifestService } from "../../../../../shared/services/pages/pages-manifest.service";
import { SyncKVComponent } from "../sync-kv.abstract";

@Component({
  selector: "cosys-duals",
  templateUrl: "./duals.component.html",
  styleUrls: ["./duals.component.scss"],
})
export class DualsComponent
  extends SyncKVComponent
  implements OnInit, OnDestroy
{
  panelOpenState = false;

  constructor(imagesStore: ImagesStore, pagesManifest: PagesManifestService) {
    super(imagesStore, pagesManifest);
  }
}
