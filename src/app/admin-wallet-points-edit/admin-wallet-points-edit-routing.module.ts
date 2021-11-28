import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminWalletPointsEditComponent } from './admin-wallet-points-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminWalletPointsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminWalletPointsEditRoutingModule { }
