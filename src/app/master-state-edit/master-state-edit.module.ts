import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterStateEditRoutingModule } from './master-state-edit-routing.module';
import { MasterStateEditComponent } from './master-state-edit.component';

@NgModule({
  declarations: [MasterStateEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterStateEditRoutingModule
  ]
})
export class MasterStateEditModule { }
