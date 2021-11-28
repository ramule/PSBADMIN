import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankTokenRoutingModule } from './bank-token-routing.module';
import { BankTokenComponent } from './bank-token.component';

@NgModule({
  declarations: [BankTokenComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BankTokenRoutingModule
  ]
})
export class BankTokenModule { }
