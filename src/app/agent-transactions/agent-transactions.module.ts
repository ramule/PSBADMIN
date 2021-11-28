import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentTransactionsRoutingModule } from './agent-transactions-routing.module';
import { AgentTransactionsComponent } from './agent-transactions.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AgentTransactionsComponent],
  imports: [
    CommonModule,
    AgentTransactionsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class AgentTransactionsModule { }
