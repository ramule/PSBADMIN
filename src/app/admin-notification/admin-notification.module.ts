import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminNotificationRoutingModule } from './admin-notification-routing.module';
import { AdminNotificationComponent } from './admin-notification.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminNotificationComponent],
  imports: [
    CommonModule,
    AdminNotificationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminNotificationModule { }
