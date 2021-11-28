import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorFormulaRoutingModule } from './calculator-formula-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorFormulaComponent } from './calculator-formula.component';

@NgModule({
  declarations: [CalculatorFormulaComponent],
  imports: [
    CommonModule,
    CalculatorFormulaRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalculatorFormulaModule { }
