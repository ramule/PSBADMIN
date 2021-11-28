import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationAddRoleRoutingModule } from './admin-administration-add-role-routing.module';
import { AdminAdministrationAddRoleComponent } from './admin-administration-add-role.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationAddRoleComponent],
  imports: [
    CommonModule,
    AdminAdministrationAddRoleRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationAddRoleModule { }
