import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCalculatorEditRoutingModule } from './master-calculator-edit-routing.module';
import { MasterCalculatorEditComponent } from './master-calculator-edit.component';

@NgModule({
  declarations: [MasterCalculatorEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCalculatorEditRoutingModule
  ]
})
export class MasterCalculatorEditModule { }
