import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkNotificationSendRoutingModule } from './bulk-notification-send-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { BulkNotificationSendComponent } from './bulk-notification-send.component';

@NgModule({
  declarations: [BulkNotificationSendComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BulkNotificationSendRoutingModule
  ]
})
export class BulkNotificationSendModule { }
