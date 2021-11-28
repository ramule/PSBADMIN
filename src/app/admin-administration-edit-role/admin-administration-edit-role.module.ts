import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationEditRoleRoutingModule } from './admin-administration-edit-role-routing.module';
import { AdminAdministrationEditRoleComponent } from './admin-administration-edit-role.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationEditRoleComponent],
  imports: [
    CommonModule,
    AdminAdministrationEditRoleRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationEditRoleModule { }
