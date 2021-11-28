import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkUploadRoutingModule } from './bulk-upload-routing.module';
import { BulkUploadComponent } from './bulk-upload.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BulkUploadComponent],
  imports: [
    CommonModule,
    BulkUploadRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule 
  ]
})
export class BulkUploadModule { }
