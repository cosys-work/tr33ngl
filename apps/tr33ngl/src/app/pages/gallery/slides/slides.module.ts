import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlidesComponent } from "./slides.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgImageSliderModule } from "ng-image-slider";
import { ExperienceComponent } from "./experience/experience.component";

@NgModule({
  declarations: [
    SlidesComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,
    MatProgressBarModule
  ],
  exports: [
    SlidesComponent,
    ExperienceComponent,
    NgImageSliderModule,
    MatProgressBarModule
  ]
})
export class SlidesModule {}
