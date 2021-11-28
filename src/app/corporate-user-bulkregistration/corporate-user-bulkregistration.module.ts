import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CorporateUserBulkregistrationRoutingModule } from './corporate-user-bulkregistration-routing.module';
import { CorporateUserBulkregistrationComponent } from './corporate-user-bulkregistration.component';



@NgModule({
  declarations: [CorporateUserBulkregistrationComponent],
  imports: [
    CommonModule,
    CorporateUserBulkregistrationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CorporateUserBulkregistrationModule { }
