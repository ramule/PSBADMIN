import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminWalletPointAddRoutingModule } from './admin-wallet-point-add-routing.module';
import { AdminWalletPointAddComponent } from './admin-wallet-point-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminWalletPointAddComponent],
  imports: [
    CommonModule,
    AdminWalletPointAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
  ]
})
export class AdminWalletPointAddModule { }
