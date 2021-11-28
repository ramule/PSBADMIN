import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleTypeRoutingModule } from './role-type-routing.module';
import { RoleTypeComponent } from './role-type.component';

@NgModule({
  declarations: [RoleTypeComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RoleTypeRoutingModule
  ]
})
export class RoleTypeModule { }
