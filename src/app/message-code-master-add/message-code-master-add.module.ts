import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageCodeMasterAddComponent } from './message-code-master-add.component';
import { MessageCodeMasterAddRoutingModule } from './message-code-master-add-routing.module';

@NgModule({
  declarations: [MessageCodeMasterAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MessageCodeMasterAddRoutingModule
  ]
})
export class MessageCodeMasterAddModule { }
