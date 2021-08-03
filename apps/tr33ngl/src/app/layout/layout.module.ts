import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { ClarityModule } from "@clr/angular";
import { HeaderComponent } from "./header/header.component";
import { GridComponent } from "./grid/grid.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterModule } from "@angular/router";

//TODO remove modules after exploring
@NgModule({
  declarations: [HeaderComponent, GridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ClarityModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [HeaderComponent, GridComponent],
})
export class LayoutModule {}
