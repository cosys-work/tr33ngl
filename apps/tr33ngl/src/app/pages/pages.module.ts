import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { LayoutModule } from "../layout/layout.module";
import { GalleryModule } from "./gallery/gallery.module";
import { DefaultComponent } from "./init/default.component";
import { SlidesModule } from "./gallery/component/slides/slides.module";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    LayoutModule,
    PagesRoutingModule,
    GalleryModule,
    SlidesModule
  ],
  exports: [DefaultComponent],
})
export class PagesModule {}
