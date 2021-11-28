import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CbsMessageTemplateRoutingModule } from './cbs-message-template-routing.module';
import { CbsMessageTemplateComponent } from './cbs-message-template.component';

@NgModule({
  declarations: [CbsMessageTemplateComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CbsMessageTemplateRoutingModule
  ]
})
export class CbsMessageTemplateModule { }
