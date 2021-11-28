import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerWiseBalanceComponent } from './customer-wise-balance.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerWiseBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerWiseBalanceRoutingModule { }
