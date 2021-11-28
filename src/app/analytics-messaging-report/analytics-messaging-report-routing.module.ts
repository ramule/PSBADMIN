import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsMessagingReportComponent } from './analytics-messaging-report.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsMessagingReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsMessagingReportRoutingModule { }
