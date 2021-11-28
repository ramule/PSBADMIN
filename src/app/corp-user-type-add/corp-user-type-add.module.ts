import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpUserTypeAddRoutingModule } from './corp-user-type-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpUserTypeAddComponent } from './corp-user-type-add.component';

@NgModule({
  declarations: [CorpUserTypeAddComponent],
  imports: [
    CommonModule,
    CorpUserTypeAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpUserTypeAddModule { }
