import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListEditRoutingModule } from './holiday-list-edit-routing.module';
import { HolidayListEditComponent } from './holiday-list-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [HolidayListEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayListEditRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class HolidayListEditModule { }
