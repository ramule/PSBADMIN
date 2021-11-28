import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLocationEditRoutingModule } from './master-location-edit-routing.module';
import { MasterLocationEditComponent } from './master-location-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MasterLocationEditComponent],
  imports: [
    CommonModule,
    MasterLocationEditRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class MasterLocationEditModule { }
