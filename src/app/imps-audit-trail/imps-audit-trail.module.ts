import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsAuditTrailComponent } from './imps-audit-trail.component';
import { ImpsAuditTrailRoutingModule } from './imps-audit-trail-routing.module';


@NgModule({
  declarations: [ImpsAuditTrailComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsAuditTrailRoutingModule
  ]
})
export class ImpsAuditTrailModule { }
