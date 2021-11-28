import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdapterSrcIpEditRoutingModule } from './adapter-src-ip-edit-routing.module';
import { AdapterSrcIpEditComponent } from './adapter-src-ip-edit.component';

@NgModule({
  declarations: [AdapterSrcIpEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AdapterSrcIpEditRoutingModule
  ]
})
export class AdapterSrcIpEditModule { }
