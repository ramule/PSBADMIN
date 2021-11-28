import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledMaintenanceComponent } from './scheduled-maintenance.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduledMaintenanceRoutingModule } from './scheduled-maintenance-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [ScheduledMaintenanceComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ScheduledMaintenanceRoutingModule
  ]
})
export class ScheduledMaintenanceModule { }
