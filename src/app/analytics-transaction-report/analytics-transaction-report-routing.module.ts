import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsTransactionReportComponent } from './analytics-transaction-report.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsTransactionReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsTransactionReportRoutingModule { }
