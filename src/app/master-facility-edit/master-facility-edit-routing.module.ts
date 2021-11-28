import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterFacilityEditComponent } from './master-facility-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterFacilityEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterFacilityEditRoutingModule { }
