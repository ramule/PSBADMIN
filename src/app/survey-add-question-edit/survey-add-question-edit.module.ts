import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyAddQuestionEditRoutingModule } from './survey-add-question-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SurveyAddQuestionEditComponent } from './survey-add-question-edit.component';

@NgModule({
  declarations: [SurveyAddQuestionEditComponent],
  imports: [
    CommonModule,
    SurveyAddQuestionEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAddQuestionEditModule { }
