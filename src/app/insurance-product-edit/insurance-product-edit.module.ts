import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceProductEditComponent } from './insurance-product-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceProductEditRoutingModule } from './insurance-product-edit-routing.module';

@NgModule({
  declarations: [InsuranceProductEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceProductEditRoutingModule
  ]
})
export class InsuranceProductEditModule { }
