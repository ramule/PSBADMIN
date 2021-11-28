import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBranchRegistrationEditRoutingModule } from './register-branch-registration-edit-routing.module';
import { RegisterBranchRegistrationEditComponent } from './register-branch-registration-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterBranchRegistrationEditComponent],
  imports: [
    CommonModule,
    RegisterBranchRegistrationEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class RegisterBranchRegistrationEditModule { }
