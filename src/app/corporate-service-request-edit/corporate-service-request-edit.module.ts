import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateServiceRequestEditRoutingModule } from './corporate-service-request-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateServiceRequestEditComponent } from './corporate-service-request-edit.component';

@NgModule({
  declarations: [CorporateServiceRequestEditComponent],
  imports: [
    CommonModule,
    CorporateServiceRequestEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateServiceRequestEditModule { }
