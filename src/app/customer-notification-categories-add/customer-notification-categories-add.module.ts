import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerNotificationCategoriesAddRoutingModule } from './customer-notification-categories-add-routing.module';
import { CustomerNotificationCategoriesAddComponent } from './customer-notification-categories-add.component';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [CustomerNotificationCategoriesAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    CustomerNotificationCategoriesAddRoutingModule
  ]
})
export class CustomerNotificationCategoriesAddModule { }
