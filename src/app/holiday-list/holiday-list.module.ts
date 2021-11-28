import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListRoutingModule } from './holiday-list-routing.module';
import { HolidayListComponent } from './holiday-list.component';

@NgModule({
  declarations: [HolidayListComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayListRoutingModule
  ]
})
export class HolidayListModule { }
