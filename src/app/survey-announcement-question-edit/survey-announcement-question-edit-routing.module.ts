import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyAnnouncementQuestionEditComponent } from './survey-announcement-question-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAnnouncementQuestionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAnnouncementQuestionEditRoutingModule { }
