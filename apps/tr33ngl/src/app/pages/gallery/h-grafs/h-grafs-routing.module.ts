import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafComponent } from "./graf/graf.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: GrafComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HGrafsRoutingModule { }
