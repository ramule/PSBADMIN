import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AdminActivitySettingEditComponent } from './admin-activity-setting-edit.component';
import { AdminActivitySettingEditRoutingModule } from './admin-activity-setting-edit-routing.module';



@NgModule({
  declarations: [AdminActivitySettingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    ReactiveFormsModule,
    AdminActivitySettingEditRoutingModule
  ]
})
export class AdminActivitySettingEditModule { }
