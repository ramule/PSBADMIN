import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOmniChannelReportComponent } from './admin-omni-channel-report.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOmniChannelReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOmniChannelReportRoutingModule { }
