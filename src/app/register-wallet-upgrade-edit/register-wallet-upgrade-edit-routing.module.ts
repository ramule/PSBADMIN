import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterWalletUpgradeEditComponent } from './register-wallet-upgrade-edit.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterWalletUpgradeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterWalletUpgradeEditRoutingModule { }
