import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpUserTypeRoutingModule } from './corp-user-type-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpUserTypeComponent } from './corp-user-type.component';

@NgModule({
  declarations: [CorpUserTypeComponent],
  imports: [
    CommonModule,
    CorpUserTypeRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpUserTypeModule { }
