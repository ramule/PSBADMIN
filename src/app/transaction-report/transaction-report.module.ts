import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionReportRoutingModule } from './transaction-report-routing.module';
import { TransactionReportComponent } from './transaction-report.component';

@NgModule({
  declarations: [TransactionReportComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionReportRoutingModule
  ]
})
export class TransactionReportModule { }
