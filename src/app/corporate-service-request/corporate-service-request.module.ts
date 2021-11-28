import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateServiceRequestRoutingModule } from './corporate-service-request-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateServiceRequestComponent } from './corporate-service-request.component';

@NgModule({
  declarations: [CorporateServiceRequestComponent],
  imports: [
    CommonModule,
    CorporateServiceRequestRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateServiceRequestModule { }
