import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsBotSurveyComponent } from './analytics-bot-survey.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsBotSurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsBotSurveyRoutingModule { }
