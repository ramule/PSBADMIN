import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyAnnouncementRoutingModule } from './survey-announcement-routing.module';
import { SurveyAnnouncementComponent } from './survey-announcement.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveyAnnouncementComponent],
  imports: [
    CommonModule,
    SurveyAnnouncementRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAnnouncementModule { }
