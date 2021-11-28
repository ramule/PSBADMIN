import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyUserRequestsAddRoutingModule } from './corporate-company-user-requests-add-routing.module';
import { CorporateCompanyUserRequestsAddComponent } from './corporate-company-user-requests-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [CorporateCompanyUserRequestsAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateCompanyUserRequestsAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class CorporateCompanyUserRequestsAddModule { }
