import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";
import { GridComponent } from "./grid/grid.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

//TODO remove modules after exploring
@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [GridComponent],
})
export class LayoutModule {}
