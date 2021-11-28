import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSystemStatusComponent } from './imps-system-status.component';
import { ImpsSystemStatusRoutingModule } from './imps-system-status-routing.module';


@NgModule({
  declarations: [ImpsSystemStatusComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSystemStatusRoutingModule
  ]
})
export class ImpsSystemStatusModule { }
