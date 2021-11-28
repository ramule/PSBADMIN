import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerWiseBalanceRoutingModule } from './customer-wise-balance-routing.module';
import { CustomerWiseBalanceComponent } from './customer-wise-balance.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [CustomerWiseBalanceComponent],
  imports: [
    CommonModule,
    CustomerWiseBalanceRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class CustomerWiseBalanceModule { }
