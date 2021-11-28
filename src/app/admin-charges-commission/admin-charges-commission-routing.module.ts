import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminChargesCommissionComponent } from './admin-charges-commission.component';


const routes: Routes = [
  {
    path: '',
    component: AdminChargesCommissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChargesCommissionRoutingModule { }
