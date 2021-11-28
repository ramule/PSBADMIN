import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BatchReportRoutingModule } from './batch-report-routing.module';
import { BatchReportComponent } from './batch-report.component';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [BatchReportComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BatchReportRoutingModule,
    Daterangepicker
  ]
})
export class BatchReportModule { }
