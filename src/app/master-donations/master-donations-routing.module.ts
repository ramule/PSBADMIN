import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDonationsComponent } from './master-donations.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDonationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDonationsRoutingModule { }
