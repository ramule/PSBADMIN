import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillPaymentComponent } from './bill-payment.component';

const routes: Routes = [
  {
    path: '',
    component: BillPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillPaymentRoutingModule { }
