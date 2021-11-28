import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyAddQuestionComponent } from './survey-add-question.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAddQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAddQuestionRoutingModule { }
