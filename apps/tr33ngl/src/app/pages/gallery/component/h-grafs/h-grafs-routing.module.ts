import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafComponent } from "./graf/graf.component";
import { GraForceComponent } from "./graf/gra-force/gra-force.component";

const routes: Routes = [
  {
    path: 'f',
    component: GrafComponent
  },
  {
    path: 'force',
    component: GraForceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HGrafsRoutingModule { }
