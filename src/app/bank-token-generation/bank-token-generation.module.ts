import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankTokenGenerationRoutingModule } from './bank-token-generation-routing.module';
import { BankTokenGenerationComponent } from './bank-token-generation.component';

@NgModule({
  declarations: [BankTokenGenerationComponent],
  imports: [
    CommonModule,
    BankTokenGenerationRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BankTokenGenerationModule { }
