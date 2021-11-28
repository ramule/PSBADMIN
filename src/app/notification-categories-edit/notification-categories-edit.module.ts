import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationCategoriesEditRoutingModule } from './notification-categories-edit-routing.module';
import { NotificationCategoriesEditComponent } from './notification-categories-edit.component';

@NgModule({
  declarations: [NotificationCategoriesEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationCategoriesEditRoutingModule
  ]
})
export class NotificationCategoriesEditModule { }
