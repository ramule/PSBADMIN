import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyAnnouncementQuestionComponent } from './survey-announcement-question.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAnnouncementQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAnnouncementQuestionRoutingModule { }
