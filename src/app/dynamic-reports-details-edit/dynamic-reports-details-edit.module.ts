import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsDetailsEditComponent } from './dynamic-reports-details-edit.component';
import { DynamicReportsDetailsEditRoutingModule } from './dynamic-reports-details-edit-routing.module';


@NgModule({
  declarations: [DynamicReportsDetailsEditComponent],
  imports: [
    CommonModule,
    DynamicReportsDetailsEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsDetailsEditModule { }
