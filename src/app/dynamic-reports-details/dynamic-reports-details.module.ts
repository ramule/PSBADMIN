import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsDetailsComponent } from './dynamic-reports-details.component';
import { DynamicReportsDetailsRoutingModule } from './dynamic-reports-details-routing.module';


@NgModule({
  declarations: [DynamicReportsDetailsComponent],
  imports: [
    CommonModule,
    DynamicReportsDetailsRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsDetailsModule { }
