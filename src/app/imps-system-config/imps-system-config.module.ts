import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSystemConfigComponent } from './imps-system-config.component';
import { ImpsSystemConfigRoutingModule } from './imps-system-config-routing.module';

@NgModule({
  declarations: [ImpsSystemConfigComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSystemConfigRoutingModule
  ]
})
export class ImpsSystemConfigModule { }
