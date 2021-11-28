import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDonationsEditComponent } from './master-donations-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDonationsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDonationsEditRoutingModule { }
