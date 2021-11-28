import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLimitsAddComponent } from './master-limits-add.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLimitsAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLimitsAddRoutingModule { }
