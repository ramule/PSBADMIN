import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpAccountUserTypeEditRoutingModule } from './corp-account-user-type-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpAccountUserTypeEditComponent } from './corp-account-user-type-edit.component';

@NgModule({
  declarations: [CorpAccountUserTypeEditComponent],
  imports: [
    CommonModule,
    CorpAccountUserTypeEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpAccountUserTypeEditModule { }
