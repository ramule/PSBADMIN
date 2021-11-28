import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdapterSrcIpComponent } from './adapter-src-ip.component';

const routes: Routes = [
  {
    path: '',
    component: AdapterSrcIpComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdapterSrcIpRoutingModule { }
