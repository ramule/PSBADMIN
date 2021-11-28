import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterConfigEditRoutingModule } from './master-config-edit-routing.module';
import { MasterConfigEditComponent } from './master-config-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MasterConfigEditComponent],
  imports: [
    CommonModule,
    MasterConfigEditRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class MasterConfigEditModule { }
