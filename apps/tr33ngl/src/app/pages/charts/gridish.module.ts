import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GridishRoutingModule } from "./gridish-routing.module";
import { ChartishModule } from "./chart-grid/chartish.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartishModule,
    GridishRoutingModule
  ]
})
export class GridishModule { }
