import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestmentProductEditRoutingModule } from './investment-product-edit-routing.module';
import { InvestmentProductEditComponent } from './investment-product-edit.component';

@NgModule({
  declarations: [InvestmentProductEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentProductEditRoutingModule
  ]
})
export class InvestmentProductEditModule { }
