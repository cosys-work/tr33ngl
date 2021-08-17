import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'ground',
    loadChildren: () => import('./component/h-grafs/h-grafs.module').then(m => m.HGrafsModule)
  },
  {
    path: 'key-val',
    loadChildren: () => import('./component/kv/kv.module').then(m => m.KvModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./component/slides/slides.module').then(m => m.SlidesModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
