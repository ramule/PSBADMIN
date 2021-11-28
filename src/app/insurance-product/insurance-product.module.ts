import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceProductRoutingModule } from './insurance-product-routing.module';
import { InsuranceProductComponent } from './insurance-product.component';

@NgModule({
  declarations: [InsuranceProductComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceProductRoutingModule
  ]
})
export class InsuranceProductModule { }
