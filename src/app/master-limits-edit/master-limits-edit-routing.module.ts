import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLimitsEditComponent } from './master-limits-edit.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLimitsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLimitsEditRoutingModule { }
