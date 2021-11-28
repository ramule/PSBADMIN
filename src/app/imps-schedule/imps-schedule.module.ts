import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsScheduleComponent } from './imps-schedule.component';
import { ImpsScheduleRoutingModule } from './imps-schedule-routing.module';


@NgModule({
  declarations: [ImpsScheduleComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsScheduleRoutingModule
  ]
})
export class ImpsScheduleModule { }
