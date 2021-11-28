import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentCreateAccountRoutingModule } from './agent-create-account-routing.module';
import { AgentCreateAccountComponent } from './agent-create-account.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgentCreateAccountComponent],
  imports: [
    CommonModule,
    AgentCreateAccountRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AgentCreateAccountModule { }
