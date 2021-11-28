import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CorporateSecurityQuestionEditComponent } from './corporate-security-question-edit.component';
import { CorporateSecurityQuestionEditRoutingModule } from './corporate-security-question-edit-routing.module';

@NgModule({
  declarations: [CorporateSecurityQuestionEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSecurityQuestionEditRoutingModule
  ]
})
export class CorporateSecurityQuestionEditModule { }
