import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityNotificationSettingRoutingModule } from './activity-notification-setting-routing.module';
import { ActivityNotificationSettingComponent } from './activity-notification-setting.component';

@NgModule({
  declarations: [ActivityNotificationSettingComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ActivityNotificationSettingRoutingModule
  ]
})
export class ActivityNotificationSettingModule { }
