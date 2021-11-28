import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerFrsRoutingModule } from './customer-frs-routing.module';
import { CustomerFrsComponent } from './customer-frs.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [CustomerFrsComponent],
  imports: [
    CommonModule,
    CustomerFrsRoutingModule,
    SharedModuleModule
  ]
})
export class CustomerFrsModule { }
