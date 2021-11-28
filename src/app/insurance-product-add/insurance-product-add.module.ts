import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceProductAddComponent } from './insurance-product-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceProductAddRoutingModule } from './insurance-product-add-routing.module';

@NgModule({
  declarations: [InsuranceProductAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceProductAddRoutingModule
  ]
})
export class InsuranceProductAddModule { }
