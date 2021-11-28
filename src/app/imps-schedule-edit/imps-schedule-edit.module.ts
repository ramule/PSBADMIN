import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsScheduleEditComponent } from './imps-schedule-edit.component';
import { ImpsScheduleEditRoutingModule } from './imps-schedule-edit-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [ImpsScheduleEditComponent],
  imports: [
    CommonModule,
    ImpsScheduleEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsScheduleEditModule { }
