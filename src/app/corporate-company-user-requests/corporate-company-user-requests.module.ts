import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyUserRequestsRoutingModule } from './corporate-company-user-requests-routing.module';
import { CorporateCompanyUserRequestsComponent } from './corporate-company-user-requests.component';

@NgModule({
  declarations: [CorporateCompanyUserRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateCompanyUserRequestsRoutingModule
  ]
})
export class CorporateCompanyUserRequestsModule { }
