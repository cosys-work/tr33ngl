import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeDModule } from "./three-d/three-d.module";

const MODS = [
  ThreeDModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODS
  ],
  exports: [
    ...MODS
  ]
})
export class SharedModule { }
