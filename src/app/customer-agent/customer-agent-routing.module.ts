import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAgentComponent } from './customer-agent.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAgentRoutingModule { }
