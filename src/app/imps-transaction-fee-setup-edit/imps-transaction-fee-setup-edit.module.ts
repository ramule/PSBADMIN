import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsTransactionFeeSetupEditComponent } from './imps-transaction-fee-setup-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ImpsTransactionFeeSetupEditRoutingModule } from './imps-transaction-fee-setup-edit-routing.module';

@NgModule({
  declarations: [ImpsTransactionFeeSetupEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule,
    ImpsTransactionFeeSetupEditRoutingModule
  ]
})
export class ImpsTransactionFeeSetupEditModule { }
