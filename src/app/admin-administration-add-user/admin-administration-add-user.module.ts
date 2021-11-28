import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationAddUserRoutingModule } from './admin-administration-add-user-routing.module';
import { AdminAdministrationAddUserComponent } from './admin-administration-add-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationAddUserComponent],
  imports: [
    CommonModule,
    AdminAdministrationAddUserRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationAddUserModule { }
