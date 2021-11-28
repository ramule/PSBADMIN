import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillPaymentRoutingModule } from './bill-payment-routing.module';
import { BillPaymentComponent } from './bill-payment.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [BillPaymentComponent],
  imports: [
    CommonModule,
    BillPaymentRoutingModule,
    SharedModuleModule
  ]
})
export class BillPaymentModule { }
