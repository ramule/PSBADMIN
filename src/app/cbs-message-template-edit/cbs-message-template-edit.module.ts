import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbsMessageTemplateEditComponent } from './cbs-message-template-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CbsMessageTemplateEditRoutingModule } from './cbs-message-template-edit-routing.module';

@NgModule({
  declarations: [CbsMessageTemplateEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CbsMessageTemplateEditRoutingModule
  ]
})
export class CbsMessageTemplateEditModule { }
