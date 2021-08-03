import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { InitComponent } from "./init/init.component";
import { MatButtonModule } from "@angular/material/button";
import { LayoutModule } from "../layout/layout.module";
import { GalleryModule } from "./gallery/gallery.module";
import { DefaultComponent } from "./init/default/default.component";
import { SlidesModule } from "./gallery/slides/slides.module";

@NgModule({
  declarations: [
    InitComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonModule,
    LayoutModule,
    GalleryModule,
    SlidesModule,
  ],
  exports: [InitComponent],
})
export class PagesModule {}
