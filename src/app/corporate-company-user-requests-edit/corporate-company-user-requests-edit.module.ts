import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyUserRequestsEditRoutingModule } from './corporate-company-user-requests-edit-routing.module';
import { CorporateCompanyUserRequestsEditComponent } from './corporate-company-user-requests-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [CorporateCompanyUserRequestsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    CorporateCompanyUserRequestsEditRoutingModule
  ]
})
export class CorporateCompanyUserRequestsEditModule { }
