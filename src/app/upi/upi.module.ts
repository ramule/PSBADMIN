import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpiRoutingModule } from './upi-routing.module';
import { UpiComponent } from './upi.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [UpiComponent],
  imports: [
    CommonModule,
    UpiRoutingModule,
    SharedModuleModule
  ]
})
export class UpiModule { }
