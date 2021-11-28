import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsScheduleAddComponent } from './imps-schedule-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImpsScheduleAddRoutingModule } from './imps-schedule-add-routing.module';

@NgModule({
  declarations: [ImpsScheduleAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsScheduleAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class ImpsScheduleAddModule { }
