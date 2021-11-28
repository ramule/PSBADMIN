import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLanguageEditRoutingModule } from './master-language-edit-routing.module';
import { MasterLanguageEditComponent } from './master-language-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [MasterLanguageEditComponent],
  imports: [
    CommonModule,
    MasterLanguageEditRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class MasterLanguageEditModule { }
