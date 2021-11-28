import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerNotificationCategoriesEditRoutingModule } from './customer-notification-categories-edit-routing.module';
import { CustomerNotificationCategoriesEditComponent } from './customer-notification-categories-edit.component';

@NgModule({
  declarations: [CustomerNotificationCategoriesEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerNotificationCategoriesEditRoutingModule
  ]
})
export class CustomerNotificationCategoriesEditModule { }
