import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineComponent } from './engine/engine.component';

const COMPS = [
  EngineComponent
]

@NgModule({
  declarations: [
    ...COMPS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPS
  ]
})
export class ThreeDModule { }
