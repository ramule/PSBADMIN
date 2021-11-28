import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeSettingRoutingModule } from './theme-setting-routing.module';
import { ThemeSettingComponent } from './theme-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [ThemeSettingComponent],
  imports: [
    CommonModule,
    ThemeSettingRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ThemeSettingModule { }
