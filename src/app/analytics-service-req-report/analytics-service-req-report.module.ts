import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsServiceReqReportRoutingModule } from './analytics-service-req-report-routing.module';
import { AnalyticsServiceReqReportComponent } from './analytics-service-req-report.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [AnalyticsServiceReqReportComponent],
  imports: [
    CommonModule,
    AnalyticsServiceReqReportRoutingModule,
    SharedModuleModule,
    FormsModule,
    Daterangepicker
  ]
})
export class AnalyticsServiceReqReportModule { }
