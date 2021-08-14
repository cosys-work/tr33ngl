import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartChromeComponent } from '../chart-chrome/chart-chrome.component';
import { ChartGridComponent } from './chart-grid/chart-grid.component';



@NgModule({
  declarations: [
    ChartChromeComponent,
    ChartGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartGridComponent
  ]
})
export class ChartishModule { }
