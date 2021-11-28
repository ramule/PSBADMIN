import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ActivitySettingComponent } from './activity-setting.component';
import { ActivitySettingRoutingModule } from './activity-setting-routing.module';



@NgModule({
  declarations: [ActivitySettingComponent],
  imports: [
    ActivitySettingRoutingModule,
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ActivitySettingModule { }
