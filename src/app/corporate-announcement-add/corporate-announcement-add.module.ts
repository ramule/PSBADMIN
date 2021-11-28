import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateAnnouncementAddComponent } from './corporate-announcement-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateAnnouncementAddRoutingModule } from './corporate-announcement-add-routing.module';

@NgModule({
  declarations: [CorporateAnnouncementAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateAnnouncementAddRoutingModule
  ]
})
export class CorporateAnnouncementAddModule { }
