import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "./init/default/default.component";

const routes: Routes = [

  { path: 'scripts', pathMatch: "full", component: DefaultComponent },
  {
    path: 'plays',
    loadChildren: () => import('./gallery/h-grafs/h-grafs.module').then(m => m.HGrafsModule)
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: "scripts"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
