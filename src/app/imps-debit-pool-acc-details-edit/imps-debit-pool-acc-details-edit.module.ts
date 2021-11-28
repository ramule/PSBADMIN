import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDebitPoolAccDetailsEditRoutingModule } from './imps-debit-pool-acc-details-edit-routing.module';
import { ImpsDebitPoolAccDetailsEditComponent } from './imps-debit-pool-acc-details-edit.component';

@NgModule({
  declarations: [ImpsDebitPoolAccDetailsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDebitPoolAccDetailsEditRoutingModule
  ]
})
export class ImpsDebitPoolAccDetailsEditModule { }
