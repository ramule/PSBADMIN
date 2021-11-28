import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSystemConfigAddComponent } from './imps-system-config-add.component';
import { ImpsSystemConfigAddRoutingModule } from './imps-system-config-add-routing.module';

@NgModule({
  declarations: [ImpsSystemConfigAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSystemConfigAddRoutingModule
  ]
})
export class ImpsSystemConfigAddModule { }
