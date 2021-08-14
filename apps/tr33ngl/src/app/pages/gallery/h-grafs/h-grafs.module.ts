import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrafComponent } from "./graf/graf.component";
import { HGrafsRoutingModule } from "./h-grafs-routing.module";


@NgModule({
  declarations: [
    GrafComponent
  ],
  imports: [
    CommonModule,
    HGrafsRoutingModule
  ],
  exports: [
    GrafComponent
  ]
})
export class HGrafsModule { }
