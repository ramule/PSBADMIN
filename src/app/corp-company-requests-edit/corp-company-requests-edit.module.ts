import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpCompanyRequestsEditRoutingModule } from './corp-company-requests-edit-routing.module';
import { CorpCompanyRequestsEditComponent } from './corp-company-requests-edit.component';

@NgModule({
  declarations: [CorpCompanyRequestsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpCompanyRequestsEditRoutingModule
  ]
})
export class CorpCompanyRequestsEditModule { }
