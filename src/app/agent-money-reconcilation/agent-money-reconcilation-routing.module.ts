import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentMoneyReconcilationComponent } from './agent-money-reconcilation.component';

const routes: Routes = [
  {
    path: '',
    component: AgentMoneyReconcilationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentMoneyReconcilationRoutingModule { }
