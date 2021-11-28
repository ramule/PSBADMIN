import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentWiseBalanceComponent } from './agent-wise-balance.component';

const routes: Routes = [
  {
    path: '',
    component: AgentWiseBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentWiseBalanceRoutingModule { }
