import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsBotSurveyRoutingModule } from './analytics-bot-survey-routing.module';
import { AnalyticsBotSurveyComponent } from './analytics-bot-survey.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnalyticsBotSurveyComponent],
  imports: [
    CommonModule,
    AnalyticsBotSurveyRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AnalyticsBotSurveyModule { }
