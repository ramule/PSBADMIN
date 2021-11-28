import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule,
    FormsModule,
    Daterangepicker
  ]
})
export class DashboardModule { }
