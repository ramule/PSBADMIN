import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleTypeAddRoutingModule } from './role-type-add-routing.module';
import { RoleTypeAddComponent } from './role-type-add.component';

@NgModule({
  declarations: [RoleTypeAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RoleTypeAddRoutingModule
  ]
})
export class RoleTypeAddModule { }
