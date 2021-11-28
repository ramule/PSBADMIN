import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserLevelSettingRoutingModule } from './corporate-user-level-setting-routing.module';
import { CorporateUserLevelSettingComponent } from './corporate-user-level-setting.component';

@NgModule({
  declarations: [CorporateUserLevelSettingComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateUserLevelSettingRoutingModule
  ]
})
export class CorporateUserLevelSettingModule { }
