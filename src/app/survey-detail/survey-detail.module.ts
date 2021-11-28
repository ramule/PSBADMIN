import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SurveyDetailComponentRoutingModule } from './survey-detail-routing.module';
import { SurveyDetailComponent } from './survey-detail.component';

@NgModule({
  declarations: [SurveyDetailComponent],
  imports: [
    CommonModule,
    SurveyDetailComponentRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ],providers:[TitleCasePipe]
})
export class SurveyDetailModule { }
