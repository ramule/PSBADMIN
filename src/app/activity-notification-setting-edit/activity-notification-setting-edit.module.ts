import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityNotificationSettingEditComponent } from './activity-notification-setting-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityNotificationSettingEditRoutingModule } from './activity-notification-setting-edit-routing.module';

@NgModule({
  declarations: [ActivityNotificationSettingEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ActivityNotificationSettingEditRoutingModule
  ]
})
export class ActivityNotificationSettingEditModule { }
