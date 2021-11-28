import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterWalletUpgradeRoutingModule } from './register-wallet-upgrade-routing.module';
import { RegisterWalletUpgradeComponent } from './register-wallet-upgrade.component';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [RegisterWalletUpgradeComponent],
  imports: [
    CommonModule,
    RegisterWalletUpgradeRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class RegisterWalletUpgradeModule { }
