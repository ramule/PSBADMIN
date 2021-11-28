import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerFrsComponent } from './customer-frs.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerFrsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerFrsRoutingModule { }
