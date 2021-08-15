import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrafComponent } from "./graf/graf.component";
import { HGrafsRoutingModule } from "./h-grafs-routing.module";

import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [
    GrafComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    HGrafsRoutingModule
  ],
  exports: [
    GrafComponent
  ]
})
export class HGrafsModule { }
