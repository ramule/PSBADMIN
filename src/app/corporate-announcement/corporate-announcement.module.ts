import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateAnnouncementRoutingModule } from './corporate-announcement-routing.module';
import { CorporateAnnouncementComponent } from './corporate-announcement.component';

@NgModule({
  declarations: [CorporateAnnouncementComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateAnnouncementRoutingModule
  ]
})
export class CorporateAnnouncementModule { }
