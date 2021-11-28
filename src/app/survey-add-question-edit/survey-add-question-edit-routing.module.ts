import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyAddQuestionEditComponent } from './survey-add-question-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAddQuestionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAddQuestionEditRoutingModule { }
