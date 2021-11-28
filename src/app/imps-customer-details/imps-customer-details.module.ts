import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ImpsCustomerDetailsComponent } from './imps-customer-details.component';
import { ImpsCustomerDetailsRoutingModule } from './imps-customer-details-routing.module';

@NgModule({
  declarations: [ImpsCustomerDetailsComponent],
  imports: [
    CommonModule,
    ImpsCustomerDetailsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ImpsCustomerDetailsModule { }
