import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ActivitySettingEditComponent } from './activity-setting-edit.component';
import { ActivitySettingEditRoutingModule } from './activity-setting-edit-routing.module';



@NgModule({
  declarations: [ActivitySettingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    ReactiveFormsModule,
    ActivitySettingEditRoutingModule
  ]
})
export class ActivitySettingEditModule { }
