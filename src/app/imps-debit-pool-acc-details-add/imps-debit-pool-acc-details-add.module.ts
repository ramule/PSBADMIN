import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDebitPoolAccDetailsAddRoutingModule } from './imps-debit-pool-acc-details-add-routing.module';
import { ImpsDebitPoolAccDetailsAddComponent } from './imps-debit-pool-acc-details-add.component';

@NgModule({
  declarations: [ImpsDebitPoolAccDetailsAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDebitPoolAccDetailsAddRoutingModule
  ]
})
export class ImpsDebitPoolAccDetailsAddModule { }
