import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrafComponent } from "./graf/graf.component";
import { HGrafsRoutingModule } from "./h-grafs-routing.module";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTimelineModule } from "ng-zorro-antd/timeline";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { GraphXyComponent } from "./graf/graph-xy/graph-xy.component";
import { GraphXyzComponent } from "./graf/graph-xyz/graph-xyz.component";
import { GraphDivComponent } from "./graf/graph-div/graph-div.component";
import { ThreeDModule } from "../../../../shared/three-d/three-d.module";
import { GraForceComponent } from "./graf/gra-force/gra-force.component";

const COMPS = [
  GrafComponent,
  GraphXyComponent,
  GraphXyzComponent,
  GraphDivComponent,
  GraForceComponent
]

@NgModule({
  declarations: [
    ...COMPS,
    GraForceComponent
  ],
  imports: [
    CommonModule,
    HGrafsRoutingModule,
    NzDividerModule,
    NzTimelineModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzTabsModule,
    NzProgressModule,
    ThreeDModule
  ],
  exports: [
    ...COMPS
  ]
})
export class HGrafsModule { }
