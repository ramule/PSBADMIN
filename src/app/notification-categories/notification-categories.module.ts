import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationCategoriesRoutingModule } from './notification-categories-routing.module';
import { NotificationCategoriesComponent } from './notification-categories.component';

@NgModule({
  declarations: [NotificationCategoriesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationCategoriesRoutingModule
  ]
})
export class NotificationCategoriesModule { }
