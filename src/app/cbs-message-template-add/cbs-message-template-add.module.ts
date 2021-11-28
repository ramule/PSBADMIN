import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbsMessageTemplateAddComponent } from './cbs-message-template-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CbsMessageTemplateAddRoutingModule } from './cbs-message-template-add-routing.module';

@NgModule({
  declarations: [CbsMessageTemplateAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CbsMessageTemplateAddRoutingModule
  ]
})
export class CbsMessageTemplateAddModule { }
