import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentTransactionsDetailsRoutingModule } from './agent-transactions-details-routing.module';
import { AgentTransactionsDetailsComponent } from './agent-transactions-details.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AgentTransactionsDetailsComponent],
  imports: [
    CommonModule,
    AgentTransactionsDetailsRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AgentTransactionsDetailsModule { }
