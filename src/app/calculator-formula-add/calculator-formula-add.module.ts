import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorFormulaAddRoutingModule } from './calculator-formula-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorFormulaAddComponent } from './calculator-formula-add.component';

@NgModule({
  declarations: [CalculatorFormulaAddComponent],
  imports: [
    CommonModule,
    CalculatorFormulaAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalculatorFormulaAddModule { }
