import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdapterAuditLogRoutingModule } from 'src/app/adapter-audit-log/adapter-audit-log-routing.module';
import { AdapterAuditLogComponent } from 'src/app/adapter-audit-log/adapter-audit-log.component';



@NgModule({
  declarations: [AdapterAuditLogComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    AdapterAuditLogRoutingModule
  ]
})
export class AdapterAuditLogModule { }
