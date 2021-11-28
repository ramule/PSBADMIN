import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdapterSrcIpEditComponent } from './adapter-src-ip-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdapterSrcIpEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdapterSrcIpEditRoutingModule { }
