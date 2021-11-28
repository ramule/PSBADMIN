import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdapterSrcIpRoutingModule } from './adapter-src-ip-routing.module';
import { AdapterSrcIpComponent } from './adapter-src-ip.component';

@NgModule({
  declarations: [AdapterSrcIpComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AdapterSrcIpRoutingModule
  ]
})
export class AdapterSrcIpModule { }
