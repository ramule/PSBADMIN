import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditTransactionsRoutingModule } from './audit-transactions-routing.module';
import { AuditTransactionsComponent } from './audit-transactions.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [AuditTransactionsComponent],
  imports: [
    CommonModule,
    AuditTransactionsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class AuditTransactionsModule { }
