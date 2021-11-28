import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterSecurityQuestionEditRoutingModule } from './master-security-question-edit-routing.module';
import { MasterSecurityQuestionEditComponent } from './master-security-question-edit.component';

@NgModule({
  declarations: [MasterSecurityQuestionEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSecurityQuestionEditRoutingModule
  ]
})
export class MasterSecurityQuestionEditModule { }
