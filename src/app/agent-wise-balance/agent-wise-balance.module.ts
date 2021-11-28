import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseBalanceRoutingModule } from './agent-wise-balance-routing.module';
import { AgentWiseBalanceComponent } from './agent-wise-balance.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AgentWiseBalanceComponent],
  imports: [
    CommonModule,
    AgentWiseBalanceRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AgentWiseBalanceModule { }
