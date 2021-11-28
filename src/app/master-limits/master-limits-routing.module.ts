import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLimitsComponent } from './master-limits.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLimitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLimitsRoutingModule { }
