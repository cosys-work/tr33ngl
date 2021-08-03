import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlidesComponent } from "./slides.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgImageSliderModule } from "ng-image-slider";

@NgModule({
  declarations: [
    SlidesComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,
    MatProgressBarModule
  ],
  exports: [
    SlidesComponent,
    NgImageSliderModule,
    MatProgressBarModule
  ]
})
export class SlidesModule {}
