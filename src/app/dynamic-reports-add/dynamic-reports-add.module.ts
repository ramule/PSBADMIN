import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsAddComponent } from './dynamic-reports-add.component';
import { DynamicReportsAddRoutingModule } from './dynamic-reports-add-routing.module';

@NgModule({
  declarations: [DynamicReportsAddComponent],
  imports: [
    CommonModule,
    DynamicReportsAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsAddModule { }
