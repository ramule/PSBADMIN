import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterWalletUpgradeComponent } from './register-wallet-upgrade.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterWalletUpgradeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterWalletUpgradeRoutingModule { }
