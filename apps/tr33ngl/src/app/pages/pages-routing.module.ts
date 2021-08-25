import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "./init/default.component";

const routes: Routes = [
  {
    path: 'grid',
    loadChildren: () => import('./charts/gridish.module').then(m => m.GridishModule)
  },
  {
    path: 'gra',
    loadChildren: () => import('./gallery/component/h-grafs/h-grafs.module').then(m => m.HGrafsModule)
  },
  {
    path: 'key-val',
    loadChildren: () => import('./gallery/component/kv/kv.module').then(m => m.KvModule)
  },
  {
    path: 'init',
    component: DefaultComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'init'
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
