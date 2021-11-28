import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionsLogsRoutingModule } from './transactions-logs-routing.module';
import { TransactionsLogsComponent } from './transactions-logs.component';




@NgModule({
  declarations: [TransactionsLogsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsLogsRoutingModule
  ]
})
export class TransactionsLogsModule { }
