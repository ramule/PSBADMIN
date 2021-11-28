import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CorporateSecurityQuestionComponent } from './corporate-security-question.component';
import { CorporateSecurityQuestionRoutingModule } from './corporate-security-question-routing.module';

@NgModule({
  declarations: [CorporateSecurityQuestionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSecurityQuestionRoutingModule
  ]
})
export class CorporateSecurityQuestionModule { }
