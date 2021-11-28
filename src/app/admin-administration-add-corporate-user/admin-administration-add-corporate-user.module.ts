import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationAddCorporateUserRoutingModule } from './admin-administration-add-corporate-user-routing.module';
import { AdminAdministrationAddCorporateUserComponent } from './admin-administration-add-corporate-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationAddCorporateUserComponent],
  imports: [
    CommonModule,
    AdminAdministrationAddCorporateUserRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationAddCorporateUserModule { }
