import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListBulkAddRoutingModule } from './holiday-list-bulk-add-routing.module';
import { HolidayListBulkAddComponent } from './holiday-list-bulk-add.component';

@NgModule({
  declarations: [HolidayListBulkAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayListBulkAddRoutingModule
  ]
})
export class HolidayListBulkAddModule { }
