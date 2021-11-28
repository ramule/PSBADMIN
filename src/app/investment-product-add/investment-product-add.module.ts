import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestmentProductAddRoutingModule } from './investment-product-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { InvestmentProductAddComponent } from './investment-product-add.component';

@NgModule({
  declarations: [InvestmentProductAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentProductAddRoutingModule
  ]
})
export class InvestmentProductAddModule { }
