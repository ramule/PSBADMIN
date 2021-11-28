import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterSecurityQuestionRoutingModule } from './master-security-question-routing.module';
import { MasterSecurityQuestionComponent } from './master-security-question.component';

@NgModule({
  declarations: [MasterSecurityQuestionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSecurityQuestionRoutingModule
  ]
})
export class MasterSecurityQuestionModule { }
