import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterWalletUpgradeEditRoutingModule } from './register-wallet-upgrade-edit-routing.module';
import { RegisterWalletUpgradeEditComponent } from './register-wallet-upgrade-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterWalletUpgradeEditComponent],
  imports: [
    CommonModule,
    RegisterWalletUpgradeEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class RegisterWalletUpgradeEditModule { }
