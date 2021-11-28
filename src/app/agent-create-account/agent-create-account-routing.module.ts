import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentCreateAccountComponent } from './agent-create-account.component';

const routes: Routes = [
  {
    path: '',
    component: AgentCreateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentCreateAccountRoutingModule { }
