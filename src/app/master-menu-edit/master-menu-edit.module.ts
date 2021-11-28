import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterMenuEditRoutingModule } from './master-menu-edit-routing.module';
import { MasterMenuEditComponent } from './master-menu-edit.component';

@NgModule({
  declarations: [MasterMenuEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterMenuEditRoutingModule
  ]
})
export class MasterMenuEditModule { }
