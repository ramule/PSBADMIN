import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyAnnouncementDetailsComponent } from './survey-announcement-details.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAnnouncementDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAnnouncementDetailsRoutingModule { }
