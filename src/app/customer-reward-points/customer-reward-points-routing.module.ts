import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerRewardPointsComponent } from './customer-reward-points.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerRewardPointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRewardPointsRoutingModule { }
