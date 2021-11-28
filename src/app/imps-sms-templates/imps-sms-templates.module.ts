import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSmsTemplatesComponent } from './imps-sms-templates.component';
import { ImpsSmsTemplatesRoutingModule } from './imps-sms-templates-routing.module';


@NgModule({
  declarations: [ImpsSmsTemplatesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSmsTemplatesRoutingModule
  ]
})
export class ImpsSmsTemplatesModule { }
