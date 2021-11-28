import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdministrationEditCorpUserRoutingModule } from './admin-administration-edit-corp-user-routing.module';
import { AdminAdministrationEditCorpUserComponent } from './admin-administration-edit-corp-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAdministrationEditCorpUserComponent],
  imports: [
    CommonModule,
    AdminAdministrationEditCorpUserRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminAdministrationEditCorpUserModule { }
