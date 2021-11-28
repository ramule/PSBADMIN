import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationEditUserRoutingModule } from './admin-administration-edit-user-routing.module';
import { AdminAdministrationEditUserComponent } from './admin-administration-edit-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationEditUserComponent],
  imports: [
    CommonModule,
    AdminAdministrationEditUserRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationEditUserModule { }
