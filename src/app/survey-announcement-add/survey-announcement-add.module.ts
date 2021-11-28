import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyAnnouncementAddComponent } from './survey-announcement-add.component';
import { SurveyAnnouncementAddRoutingModule } from './survey-announcement-add-routing.module';
@NgModule({
  declarations: [SurveyAnnouncementAddComponent],
  imports: [
    CommonModule,
    SurveyAnnouncementAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class SurveyAnnouncementAddModule { }
