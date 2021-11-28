import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorprateSetLimitConfirmRoutingModule } from './corprate-set-limit-confirm-routing.module';
import { CorprateSetLimitConfirmComponent } from './corprate-set-limit-confirm.component';



@NgModule({
  declarations: [CorprateSetLimitConfirmComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorprateSetLimitConfirmRoutingModule
  ]
})
export class CorprateSetLimitConfirmModule { }
