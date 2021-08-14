import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartChromeComponent } from '../chart-chrome/chart-chrome.component';
import { ChartGridComponent } from './chart-grid/chart-grid.component';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ChartChromeComponent,
    ChartGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzTabsModule,
    NzSliderModule,
    NzProgressModule,
    NzTypographyModule
  ],
  exports: [
    ChartGridComponent,
    ChartChromeComponent
  ]
})
export class ChartishModule { }
