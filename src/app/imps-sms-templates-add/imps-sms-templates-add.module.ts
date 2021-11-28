import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSmsTemplatesAddComponent } from './imps-sms-templates-add.component';
import { ImpsSmsTemplatesAddRoutingModule } from './imps-sms-templates-add-routing.module';


@NgModule({
  declarations: [ImpsSmsTemplatesAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSmsTemplatesAddRoutingModule
  ]
})
export class ImpsSmsTemplatesAddModule { }
