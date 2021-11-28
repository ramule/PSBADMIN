import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDeviceMasterEditRoutingModule } from './customer-device-master-edit-routing.module';
import { CustomerDeviceMasterEditComponent } from './customer-device-master-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerDeviceMasterEditComponent],
  imports: [
    CommonModule,
    CustomerDeviceMasterEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class CustomerDeviceMasterEditModule { }
