import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyAnnouncementQuestionRoutingModule } from './survey-announcement-question-routing.module';
import { SurveyAnnouncementQuestionComponent } from './survey-announcement-question.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveyAnnouncementQuestionComponent],
  imports: [
    CommonModule,
    SurveyAnnouncementQuestionRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAnnouncementQuestionModule { }
