import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivityHourlyLogsComponent } from './activity-hourly-logs.component';
import { ActivityHourlyLogsRoutingModule } from './activity-hourly-logs-routing.module';
import { Daterangepicker } from 'ng2-daterangepicker';



@NgModule({
  declarations: [ActivityHourlyLogsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    ActivityHourlyLogsRoutingModule,
    Daterangepicker,
  ]
})
export class ActivityHourlyLogsModule { }
