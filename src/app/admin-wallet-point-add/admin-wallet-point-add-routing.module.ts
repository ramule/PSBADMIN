import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminWalletPointAddComponent } from './admin-wallet-point-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWalletPointAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminWalletPointAddRoutingModule { }
