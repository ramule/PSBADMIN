import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentPendingPaymentRoutingModule } from './agent-pending-payment-routing.module';
import { AgentPendingPaymentComponent } from './agent-pending-payment.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AgentPendingPaymentComponent],
  imports: [
    CommonModule,
    AgentPendingPaymentRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AgentPendingPaymentModule { }
