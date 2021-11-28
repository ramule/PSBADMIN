import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { AdminWalletPointsEditRoutingModule } from './admin-wallet-points-edit-routing.module';
import { AdminWalletPointsEditComponent } from './admin-wallet-points-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminWalletPointsEditComponent],
  imports: [
    CommonModule,
    AdminWalletPointsEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class AdminWalletPointsEditModule { }
