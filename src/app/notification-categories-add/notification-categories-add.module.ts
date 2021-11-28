import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationCategoriesAddRoutingModule } from './notification-categories-add-routing.module';
import { NotificationCategoriesAddComponent } from './notification-categories-add.component';

@NgModule({
  declarations: [NotificationCategoriesAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationCategoriesAddRoutingModule
  ]
})
export class NotificationCategoriesAddModule { }
