import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentTransactionsDetailsComponent } from './agent-transactions-details.component';

const routes: Routes = [
  {
    path: '',
    component: AgentTransactionsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentTransactionsDetailsRoutingModule { }
