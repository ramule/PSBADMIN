import { NgModule } from '@angular/core';
import { MasterFacilityComponent } from './master-facility.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MasterFacilityComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterFacilityRoutingModule { }
