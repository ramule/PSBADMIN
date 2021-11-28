import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ImpsDebitPoolAccDetailsComponent } from './imps-debit-pool-acc-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDebitPoolAccDetailsRoutingModule } from './imps-debit-pool-acc-details-routing.module';

@NgModule({
  declarations: [ImpsDebitPoolAccDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDebitPoolAccDetailsRoutingModule
  ]
})
export class ImpsDebitPoolAccDetailsModule { }
