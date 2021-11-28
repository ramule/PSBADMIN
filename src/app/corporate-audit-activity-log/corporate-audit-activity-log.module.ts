import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { CorporateAuditActivityLogComponent } from './corporate-audit-activity-log.component';
import { CorporateAuditActivityLogRoutingModule } from './corporate-audit-activity-log-routing.module';


@NgModule({
  declarations: [CorporateAuditActivityLogComponent],
  imports: [
    CommonModule,
    CorporateAuditActivityLogRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class CorporateAuditActivityLogModule { }
