import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditActivityLogRoutingModule } from './audit-activity-log-routing.module';
import { AuditActivityLogComponent } from './audit-activity-log.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

import { ReactiveFormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [AuditActivityLogComponent],
  imports: [
    CommonModule,
    AuditActivityLogRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class AuditActivityLogModule { }
