import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DualsComponent } from "./duals/duals.component";
import { StepsComponent } from "./steps/steps.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    DualsComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DualsComponent,
    StepsComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KvModule {}
