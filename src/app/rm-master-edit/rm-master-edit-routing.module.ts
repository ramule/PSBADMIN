import { NgModule } from '@angular/core';
import { RmMasterEditComponent } from './rm-master-edit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RmMasterEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmMasterEditRoutingModule { }
