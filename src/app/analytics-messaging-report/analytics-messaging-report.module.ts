import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsMessagingReportRoutingModule } from './analytics-messaging-report-routing.module';
import { AnalyticsMessagingReportComponent } from './analytics-messaging-report.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [AnalyticsMessagingReportComponent],
  imports: [
    CommonModule,
    AnalyticsMessagingReportRoutingModule,
    SharedModuleModule,
    FormsModule,
    Daterangepicker
  ]
})
export class AnalyticsMessagingReportModule { }
