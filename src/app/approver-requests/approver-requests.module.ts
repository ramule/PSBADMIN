import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproverRequestsRoutingModule } from './approver-requests-routing.module';
import { ApproverRequestsComponent } from './approver-requests.component';



@NgModule({
  declarations: [ApproverRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ApproverRequestsRoutingModule
  ]
})
export class ApproverRequestsModule { }
