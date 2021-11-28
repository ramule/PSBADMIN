import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminActivitiesComponent } from './admin-activities.component';
import { AdminActivitiesRoutingModule } from './admin-activities-routing.module';
import { Daterangepicker } from 'ng2-daterangepicker';


@NgModule({
  declarations: [AdminActivitiesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    AdminActivitiesRoutingModule
  ]
})
export class AdminActivitiesModule { }
