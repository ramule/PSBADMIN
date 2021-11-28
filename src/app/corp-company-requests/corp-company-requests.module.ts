import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpCompanyRequestsRoutingModule } from './corp-company-requests-routing.module';
import { CorpCompanyRequestsComponent } from './corp-company-requests.component';

@NgModule({
  declarations: [CorpCompanyRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpCompanyRequestsRoutingModule
  ]
})
export class CorpCompanyRequestsModule { }
