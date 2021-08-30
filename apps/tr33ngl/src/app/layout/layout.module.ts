import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";
import { GridComponent } from "./grid/grid.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { GrafHeaderComponent } from "./graf-header/graf-header.component";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { GraphToolboxComponent } from "./graf-header/graph-toolbox/graph-toolbox.component";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";

const COMPS = [
  GridComponent,
  GrafHeaderComponent,
  GraphToolboxComponent
];


@NgModule({
  declarations: [
    ...COMPS
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NzGridModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzDescriptionsModule,
    NzIconModule,
    NzButtonModule
  ],
  exports: [
    ...COMPS
  ],
})
export class LayoutModule {}
