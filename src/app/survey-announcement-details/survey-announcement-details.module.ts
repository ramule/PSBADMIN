import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyAnnouncementDetailsRoutingModule } from './survey-announcement-details-routing.module';
import { SurveyAnnouncementDetailsComponent } from './survey-announcement-details.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveyAnnouncementDetailsComponent],
  imports: [
    CommonModule,
    SurveyAnnouncementDetailsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyAnnouncementDetailsModule { }
