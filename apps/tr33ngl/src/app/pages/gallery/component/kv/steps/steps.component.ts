import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImagesStore } from "../../../../../shared/stores/images.store";
import { PagesManifestService } from "../../../../../shared/services/pages/pages-manifest.service";
import { SyncKVComponent } from "../sync-kv.abstract";

@Component({
  selector: "cosys-steps",
  templateUrl: "./steps.component.html",
  styleUrls: ["./steps.component.scss"],
})
export class StepsComponent
  extends SyncKVComponent
  implements OnInit, OnDestroy
{
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    imagesStore: ImagesStore,
    pagesManifest: PagesManifestService
  ) {
    super(imagesStore, pagesManifest);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
  }
}
