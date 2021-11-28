import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateAuditTransactionRoutingModule } from './corporate-audit-transaction-routing.module';
import { CorporateAuditTransactionComponent } from './corporate-audit-transaction.component';

@NgModule({
  declarations: [CorporateAuditTransactionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateAuditTransactionRoutingModule
  ]
})
export class CorporateAuditTransactionModule { }
