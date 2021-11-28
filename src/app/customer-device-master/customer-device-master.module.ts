import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDeviceMasterRoutingModule } from './customer-device-master-routing.module';
import { CustomerDeviceMasterComponent } from './customer-device-master.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [CustomerDeviceMasterComponent],
  imports: [
    CommonModule,
    CustomerDeviceMasterRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class CustomerDeviceMasterModule { }
