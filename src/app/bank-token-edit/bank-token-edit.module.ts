import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankTokenEditRoutingModule } from './bank-token-edit-routing.module';
import { BankTokenEditComponent } from './bank-token-edit.component';

@NgModule({
  declarations: [BankTokenEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BankTokenEditRoutingModule
  ]
})
export class BankTokenEditModule { }
