import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTransactionFeeSetupRoutingModule } from './imps-transaction-fee-setup-routing.module';
import { ImpsTransactionFeeSetupComponent } from './imps-transaction-fee-setup.component';

@NgModule({
  declarations: [ImpsTransactionFeeSetupComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTransactionFeeSetupRoutingModule
  ]
})
export class ImpsTransactionFeeSetupModule { }
