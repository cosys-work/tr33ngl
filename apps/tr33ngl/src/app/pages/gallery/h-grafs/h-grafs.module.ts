import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HGrafsRoutingModule } from './h-grafs-routing.module';
import { GrafComponent } from './graf/graf.component';


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
