import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminChargesCommissionAddComponent } from './admin-charges-commission-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminChargesCommissionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChargesCommissionAddRoutingModule { }
