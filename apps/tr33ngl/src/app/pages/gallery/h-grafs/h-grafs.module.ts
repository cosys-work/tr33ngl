import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrafComponent } from "./graf/graf.component";
import { HGrafsRoutingModule } from "./h-grafs-routing.module";

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimelineModule } from "ng-zorro-antd/timeline";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";

@NgModule({
  declarations: [
    GrafComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    NzTimelineModule,
    NzIconModule,
    NzGridModule,
    HGrafsRoutingModule
  ],
  exports: [
    GrafComponent
  ]
})
export class HGrafsModule { }
