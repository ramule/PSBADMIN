import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyAnnouncementAddComponent } from './survey-announcement-add.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyAnnouncementAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyAnnouncementAddRoutingModule { }
