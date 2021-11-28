import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyAnnouncementQuestionEditRoutingModule } from './survey-announcement-question-edit-routing.module';
import { SurveyAnnouncementQuestionEditComponent } from './survey-announcement-question-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveyAnnouncementQuestionEditComponent],
  imports: [
    CommonModule,
    SurveyAnnouncementQuestionEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAnnouncementQuestionEditModule { }
