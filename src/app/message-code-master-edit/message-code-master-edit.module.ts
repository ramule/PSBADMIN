import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageCodeMasterEditRoutingModule } from './message-code-master-edit-routing.module';
import { MessageCodeMasterEditComponent } from './message-code-master-edit.component';

@NgModule({
  declarations: [MessageCodeMasterEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MessageCodeMasterEditRoutingModule
  ]
})
export class MessageCodeMasterEditModule { }
