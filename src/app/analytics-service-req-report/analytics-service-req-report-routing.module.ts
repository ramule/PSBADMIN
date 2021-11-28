import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsServiceReqReportComponent } from './analytics-service-req-report.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsServiceReqReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsServiceReqReportRoutingModule { }
