import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationSendRoutingModule } from './notification-send-routing.module';
import { NotificationSendComponent } from './notification-send.component';


@NgModule({
  declarations: [NotificationSendComponent],
  imports: [
    CommonModule,
    NotificationSendRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class NotificationSendModule { }
