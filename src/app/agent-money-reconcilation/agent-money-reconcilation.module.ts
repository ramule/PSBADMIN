import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentMoneyReconcilationRoutingModule } from './agent-money-reconcilation-routing.module';
import { AgentMoneyReconcilationComponent } from './agent-money-reconcilation.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AgentMoneyReconcilationComponent],
  imports: [
    CommonModule,
    AgentMoneyReconcilationRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AgentMoneyReconcilationModule { }
