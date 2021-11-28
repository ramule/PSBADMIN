import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterConfigEditComponent } from './master-config-edit.component';


const routes: Routes = [
  {
    path: '',
    component: MasterConfigEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterConfigEditRoutingModule { }
