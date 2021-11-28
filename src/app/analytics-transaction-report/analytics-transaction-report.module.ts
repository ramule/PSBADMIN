import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsTransactionReportRoutingModule } from './analytics-transaction-report-routing.module';
import { AnalyticsTransactionReportComponent } from './analytics-transaction-report.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [AnalyticsTransactionReportComponent],
  imports: [
    CommonModule,
    AnalyticsTransactionReportRoutingModule,
    SharedModuleModule,
    FormsModule,
    Daterangepicker
  ]
})
export class AnalyticsTransactionReportModule { }
