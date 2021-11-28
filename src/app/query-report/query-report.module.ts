import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryReportRoutingModule } from './query-report-routing.module';
import { QueryReportComponent } from './query-report.component';



@NgModule({
  declarations: [QueryReportComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    QueryReportRoutingModule
  ]
})
export class QueryReportModule { }
