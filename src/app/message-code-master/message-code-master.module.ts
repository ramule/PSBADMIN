import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageCodeMasterRoutingModule } from './message-code-master-routing.module';
import { MessageCodeMasterComponent } from './message-code-master.component';

@NgModule({
  declarations: [MessageCodeMasterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MessageCodeMasterRoutingModule
  ]
})
export class MessageCodeMasterModule { }
