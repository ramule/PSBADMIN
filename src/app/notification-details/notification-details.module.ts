import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationDetailsRoutingModule } from './notification-details-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationDetailsComponent } from './notification-details.component';


@NgModule({
  declarations: [NotificationDetailsComponent],
  imports: [
    CommonModule,
    NotificationDetailsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class NotificationDetailsModule { }
