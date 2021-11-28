import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAgentEditComponent } from './customer-agent-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerAgentEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAgentEditRoutingModule { }
