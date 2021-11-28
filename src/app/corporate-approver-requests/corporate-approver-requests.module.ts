import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateApproverRequestsRoutingModule } from './corporate-approver-requests-routing.module';
import { CorporateApproverRequestsComponent } from './corporate-approver-requests.component';

@NgModule({
  declarations: [CorporateApproverRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateApproverRequestsRoutingModule
  ]
})
export class CorporateApproverRequestsModule { }
