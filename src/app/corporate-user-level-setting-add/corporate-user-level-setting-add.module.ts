import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserLevelSettingAddRoutingModule } from './corporate-user-level-setting-add-routing.module';
import { CorporateUserLevelSettingAddComponent } from './corporate-user-level-setting-add.component';

@NgModule({
  declarations: [CorporateUserLevelSettingAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateUserLevelSettingAddRoutingModule
  ]
})
export class CorporateUserLevelSettingAddModule { }
