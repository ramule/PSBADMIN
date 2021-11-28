import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAgentRoutingModule } from './customer-agent-routing.module';
import { CustomerAgentComponent } from './customer-agent.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [CustomerAgentComponent],
  imports: [
    CommonModule,
    CustomerAgentRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CustomerAgentModule { }
