import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListAddRoutingModule } from './holiday-list-add-routing.module';
import { HolidayListAddComponent } from './holiday-list-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [HolidayListAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayListAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class HolidayListAddModule { }
