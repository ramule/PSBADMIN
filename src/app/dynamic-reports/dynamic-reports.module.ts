import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsComponent } from './dynamic-reports.component';
import { DynamicReportsRoutingModule } from './dynamic-reports-routing.module';

@NgModule({
  declarations: [DynamicReportsComponent],
  imports: [
    CommonModule,
    DynamicReportsRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsModule { }
