import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyAnnouncementComponent } from './survey-announcement.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAnnouncementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAnnouncementRoutingModule { }
