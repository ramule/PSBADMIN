import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MerchantComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    SharedModuleModule
  ]
})
export class MerchantModule { }
