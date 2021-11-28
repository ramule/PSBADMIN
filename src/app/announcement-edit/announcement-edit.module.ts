import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementEditRoutingModule } from './announcement-edit-routing.module';
import { AnnouncementEditComponent } from './announcement-edit.component';

@NgModule({
  declarations: [AnnouncementEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AnnouncementEditRoutingModule
  ]
})
export class AnnouncementEditModule { }
