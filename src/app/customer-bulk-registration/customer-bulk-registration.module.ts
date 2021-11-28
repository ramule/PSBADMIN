import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerBulkRegistrationComponent } from './customer-bulk-registration.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerBulkRegistrationRoutingModule } from './customer-bulk-registration-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomerBulkRegistrationComponent],
  imports: [
    CommonModule,
    CustomerBulkRegistrationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerBulkRegistrationModule { }
