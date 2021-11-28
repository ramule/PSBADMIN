import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionsTableRoutingModule } from './transactions-table-routing.module';
import { TransactionsTableComponent } from './transactions-table.component';


@NgModule({
  declarations: [TransactionsTableComponent],
  imports: [
    //CommonModule
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsTableRoutingModule,
    
  ]
})
export class TransactionsTableModule { }
