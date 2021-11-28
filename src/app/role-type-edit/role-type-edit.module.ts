import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleTypeEditRoutingModule } from './role-type-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { RoleTypeEditComponent } from './role-type-edit.component';

@NgModule({
  declarations: [RoleTypeEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RoleTypeEditRoutingModule
  ]
})
export class RoleTypeEditModule { }
