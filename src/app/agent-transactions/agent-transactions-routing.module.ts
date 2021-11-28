import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentTransactionsComponent } from './agent-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: AgentTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentTransactionsRoutingModule { }
