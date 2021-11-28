import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterStateEditComponent } from './master-state-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterStateEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterStateEditRoutingModule { }
