import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAgentEditRoutingModule } from './customer-agent-edit-routing.module';
import { CustomerAgentEditComponent } from './customer-agent-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerAgentEditComponent],
  imports: [
    CommonModule,
    CustomerAgentEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
  ]
})
export class CustomerAgentEditModule { }
