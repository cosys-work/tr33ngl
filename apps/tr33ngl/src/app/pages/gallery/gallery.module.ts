import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CrystalLightboxModule } from "@crystalui/angular-lightbox";
import { HGrafsModule } from "./component/h-grafs/h-grafs.module";
import { KvModule } from "./component/kv/kv.module";
import { SlidesModule } from "./component/slides/slides.module";
import { GalleryComponent } from "./gallery.component";

@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    CrystalLightboxModule,
    HGrafsModule,
    KvModule,
    SlidesModule,
  ],
  exports: [
    HGrafsModule,
    KvModule,
    SlidesModule,
    GalleryComponent
  ]
})
export class GalleryModule {}
