import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsEditComponent } from './dynamic-reports-edit.component';
import { DynamicReportsEditRoutingModule } from './dynamic-reports-edit-routing.module';

@NgModule({
  declarations: [DynamicReportsEditComponent],
  imports: [
    CommonModule,
    DynamicReportsEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsEditModule { }
