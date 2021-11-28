import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterConfigComponent } from './master-config.component';


const routes: Routes = [
  {
    path: '',
    component: MasterConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterConfigRoutingModule { }
