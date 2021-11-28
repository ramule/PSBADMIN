import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateAnnouncementEditRoutingModule } from './corporate-announcement-edit-routing.module';
import { CorporateAnnouncementEditComponent } from './corporate-announcement-edit.component';

@NgModule({
  declarations: [CorporateAnnouncementEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateAnnouncementEditRoutingModule
  ]
})
export class CorporateAnnouncementEditModule { }
