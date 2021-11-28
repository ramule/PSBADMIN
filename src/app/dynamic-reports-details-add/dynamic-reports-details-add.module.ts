import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicReportsDetailsAddComponent } from './dynamic-reports-details-add.component';
import { DynamicReportsDetailsAddRoutingModule } from './dynamic-reports-details-add-routing.module';


@NgModule({
  declarations: [DynamicReportsDetailsAddComponent],
  imports: [
    CommonModule,
    DynamicReportsDetailsAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DynamicReportsDetailsAddModule { }
