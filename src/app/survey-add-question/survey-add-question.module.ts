import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SurveyAddQuestionRoutingModule } from './survey-add-question-routing.module';
import { SurveyAddQuestionComponent } from './survey-add-question.component';


@NgModule({
  declarations: [SurveyAddQuestionComponent],
  imports: [
    CommonModule,
    SurveyAddQuestionRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAddQuestionModule { }
