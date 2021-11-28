import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestmentProductRoutingModule } from './investment-product-routing.module';
import { InvestmentProductComponent } from './investment-product.component';

@NgModule({
  declarations: [InvestmentProductComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentProductRoutingModule
  ]
})
export class InvestmentProductModule { }
