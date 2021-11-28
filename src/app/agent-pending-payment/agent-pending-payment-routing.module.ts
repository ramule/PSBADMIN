import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentPendingPaymentComponent } from './agent-pending-payment.component';

const routes: Routes = [
  {
    path: '',
    component: AgentPendingPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentPendingPaymentRoutingModule { }
