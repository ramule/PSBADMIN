import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivityHourlyLogsComponent } from './activity-hourly-logs.component';


const routes: Routes = [
  {
    path: '',
    component: ActivityHourlyLogsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityHourlyLogsRoutingModule { }
