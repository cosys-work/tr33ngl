import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrafComponent } from "./graf/graf.component";
import { HGrafsRoutingModule } from "./h-grafs-routing.module";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTimelineModule } from "ng-zorro-antd/timeline";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";

@NgModule({
  declarations: [
    GrafComponent
  ],
  imports: [
    CommonModule,
    HGrafsRoutingModule,
    NzDividerModule,
    NzTimelineModule,
    NzIconModule,
    NzGridModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzTabsModule,
    NzBreadCrumbModule,
    NzDropDownModule
  ],
  exports: [
    GrafComponent
  ]
})
export class HGrafsModule { }
