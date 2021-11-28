import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsConnectionStatusRoutingModule } from './imps-connection-status-routing.module';
import { ImpsConnectionStatusComponent } from './imps-connection-status.component';

@NgModule({
  declarations: [ImpsConnectionStatusComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsConnectionStatusRoutingModule
  ]
})
export class ImpsConnectionStatusModule { }
