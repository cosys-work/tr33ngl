import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'ground',
    loadChildren: () => import('./h-grafs/h-grafs.module').then(m => m.HGrafsModule)
  },
  {
    path: 'key-val',
    loadChildren: () => import('./kv/kv.module').then(m => m.KvModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.module').then(m => m.SlidesModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
