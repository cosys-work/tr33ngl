import { Injectable } from "@angular/core";
import * as manifest from "../../../../assets/pages.manifest.json";
import { PagesSchemaKneeFest } from "../../models/pages-manifest.model";

@Injectable({
  providedIn: "root",
})
export class PagesManifestService {
  private readonly pagesManifest: PagesSchemaKneeFest;

  constructor() {
    this.pagesManifest = manifest as unknown as PagesSchemaKneeFest;
  }

  get schema() {
    return this.pagesManifest.iSchema;
  }

  get content() {
    return this.pagesManifest.iContent;
  }
}
