import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserLevelSettingEditRoutingModule } from './corporate-user-level-setting-edit-routing.module';
import { CorporateUserLevelSettingEditComponent } from './corporate-user-level-setting-edit.component';

@NgModule({
  declarations: [CorporateUserLevelSettingEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateUserLevelSettingEditRoutingModule
  ]
})
export class CorporateUserLevelSettingEditModule { }
