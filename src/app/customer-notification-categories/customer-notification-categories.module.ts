import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerNotificationCategoriesRoutingModule } from './customer-notification-categories-routing.module';
import { CustomerNotificationCategoriesComponent } from './customer-notification-categories.component';

@NgModule({
  declarations: [CustomerNotificationCategoriesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerNotificationCategoriesRoutingModule
  ]
})
export class CustomerNotificationCategoriesModule { }
