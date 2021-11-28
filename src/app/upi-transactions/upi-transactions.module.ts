import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpiTransactionsComponent } from './upi-transactions.component';
import { UpiTransactionsRoutingModule } from './upi-transactions-routing.module';


@NgModule({
  declarations: [UpiTransactionsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    UpiTransactionsRoutingModule
  ]
})
export class UpiTransactionsModule { }
