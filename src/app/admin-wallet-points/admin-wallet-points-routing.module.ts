import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminWalletPointsComponent } from './admin-wallet-points.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWalletPointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminWalletPointsRoutingModule { }
