import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsSmsTemplatesEditComponent } from './imps-sms-templates-edit.component';
import { ImpsSmsTemplatesEditRoutingModule } from './imps-sms-templates-edit-routing.module';

@NgModule({
  declarations: [ImpsSmsTemplatesEditComponent],
  imports: [
    CommonModule,
    ImpsSmsTemplatesEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsSmsTemplatesEditModule { }
