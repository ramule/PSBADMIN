import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpUserTypeEditRoutingModule } from './corp-user-type-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpUserTypeEditComponent } from './corp-user-type-edit.component';

@NgModule({
  declarations: [CorpUserTypeEditComponent],
  imports: [
    CommonModule,
    CorpUserTypeEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpUserTypeEditModule { }
