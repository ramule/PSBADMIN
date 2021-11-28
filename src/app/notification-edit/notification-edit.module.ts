import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationEditRoutingModule } from './notification-edit-routing.module';
import { NotificationEditComponent } from './notification-edit.component';

@NgModule({
  declarations: [NotificationEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationEditRoutingModule
  ]
})
export class NotificationEditModule { }
