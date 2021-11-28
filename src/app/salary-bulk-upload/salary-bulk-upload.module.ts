import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SalaryBulkUploadComponent } from './salary-bulk-upload.component';
import { SalaryBulkUploadRoutingModule } from './salary-bulk-upload-routing.module';



@NgModule({
  declarations: [SalaryBulkUploadComponent],
  imports: [
    CommonModule,
    SalaryBulkUploadRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalaryBulkUploadModule { }
