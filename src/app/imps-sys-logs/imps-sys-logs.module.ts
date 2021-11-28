import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSysLogsRoutingModule } from './imps-sys-logs-routing.module';
import { ImpsSysLogsComponent } from './imps-sys-logs.component';

@NgModule({
  declarations: [ImpsSysLogsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSysLogsRoutingModule
  ]
})
export class ImpsSysLogsModule { }
