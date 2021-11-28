import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCalculatorRoutingModule } from './master-calculator-routing.module';
import { MasterCalculatorComponent } from './master-calculator.component';



@NgModule({
  declarations: [MasterCalculatorComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCalculatorRoutingModule
  ]
})
export class MasterCalculatorModule { }
