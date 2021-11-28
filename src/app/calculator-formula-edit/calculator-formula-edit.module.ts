import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorFormulaEditRoutingModule } from './calculator-formula-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorFormulaEditComponent } from './calculator-formula-edit.component';

@NgModule({
  declarations: [CalculatorFormulaEditComponent],
  imports: [
    CommonModule,
    CalculatorFormulaEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalculatorFormulaEditModule { }
