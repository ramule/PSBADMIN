import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminNotificationRoutingModule } from 'src/app/admin-notification/admin-notification-routing.module';
import { NotificationRoutingModule } from 'src/app/notification/notification-routing.module';
import { NotificationComponent } from 'src/app/notification/notification.component';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
