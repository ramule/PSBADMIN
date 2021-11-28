import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOmniChannelReportRoutingModule } from './admin-omni-channel-report-routing.module';
import { AdminOmniChannelReportComponent } from './admin-omni-channel-report.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminOmniChannelReportComponent],
  imports: [
    CommonModule,
    AdminOmniChannelReportRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminOmniChannelReportModule { }
