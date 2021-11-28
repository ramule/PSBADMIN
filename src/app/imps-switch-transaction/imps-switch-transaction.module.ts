import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSwitchTransactionRoutingModule } from './imps-switch-transaction-routing.module';
import { ImpsSwitchTransactionComponent } from './imps-switch-transaction.component';

@NgModule({
  declarations: [ImpsSwitchTransactionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSwitchTransactionRoutingModule
  ]
})
export class ImpsSwitchTransactionModule { }
