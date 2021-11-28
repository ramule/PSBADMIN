import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminChargesCommissionEditComponent } from './admin-charges-commission-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminChargesCommissionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChargesCommissionEditRoutingModule { }
