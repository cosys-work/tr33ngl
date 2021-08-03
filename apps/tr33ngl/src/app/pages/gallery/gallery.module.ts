import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryComponent } from "./gallery.component";
import { CrystalLightboxModule } from "@crystalui/angular-lightbox";
import { ExperienceComponent } from "./experience/experience.component";
import { HGrafsModule } from "./h-grafs/h-grafs.module";
import { KvModule } from "./kv/kv.module";
import { SlidesModule } from "./slides/slides.module";

@NgModule({
  declarations: [
    GalleryComponent,
    ExperienceComponent,
  ],
  imports: [
    CommonModule,
    CrystalLightboxModule,
    HGrafsModule,
    KvModule,
    SlidesModule,
  ],
  exports: [
    GalleryComponent,
    ExperienceComponent,
    HGrafsModule,
    KvModule,
    SlidesModule
  ]
})
export class GalleryModule {}
